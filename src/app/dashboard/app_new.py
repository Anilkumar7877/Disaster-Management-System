from pymongo import MongoClient
import pandas as pd
import numpy as np
import json
import re
import spacy
import requests
import io
import time

# MongoDB connection
client = MongoClient('mongodb+srv://anilpython7877:newpassword1212@nextauthuser.n7vzr.mongodb.net/clientapp?retryWrites=true&w=majority&appName=nextauthuser')
db = client['clientapp']

def download_tweets():
    try:
        # Set timeout and retry strategy
        response = requests.get('http://192.168.84.136:5000/api/tweets', )
        response.raise_for_status()

        csv_data = io.StringIO(response.text)
        df = pd.read_csv(csv_data)
        return df
        
    except requests.exceptions.RequestException as e:

        print("______________________________Failed to download CSV")
        return None

def clean_tweet(df):
    def clean_tweet(text):
        # Remove URLs
        text = re.sub(r'http\S+|www\S+|https\S+', '', text, flags=re.MULTILINE)
        # Remove user mentions
        text = re.sub(r'@\w+', '', text)
        # Remove hashtags
        text = re.sub(r'#\w+', '', text)
        # Remove newlines
        text = re.sub(r'\n+', ' ', text)
        # Remove special characters and numbers
        text = re.sub(r'[^\w\s]', '', text)
        text = re.sub(r'\d+', '', text)
        # Convert to lowercase and strip whitespace
        text = text.strip()
        return text

    # Create cleaned_text column if it doesn't exist
    if 'cleaned_text' not in df.columns:
        df['cleaned_text'] = ''
    
    df['cleaned_text'] = df['tweet'].apply(clean_tweet)

    collection = db['saveTweets']
    collection.insert_many(df.to_dict('records'))
    
def extract_locations(tweets):

    nlp_ner = spacy.load("NER\\0fner_model_custom_1")
    # nlp_ner_dis = spacy.load("NER\\30k\\model-best")

    gpe_entities = []
    # Process each tweet and extract GPE entities
    for idx, text in enumerate(tweets, start=1):
        doc = nlp_ner(text)
        
        for ent in doc.ents:
            if ent.label_ == "GPE":  # Only collect GPE entities
                gpe_entities.append([ent.text])  # Append as a list to match DataFrame column structure

    # Create a DataFrame from the list of GPE entities
    df = pd.DataFrame(gpe_entities, columns=['location']) 

    return df

def match_location(df2):
    # Read JSON file
    with open('JP.json', 'r') as file:
        json_data = json.load(file)

    df1 = pd.DataFrame([{
        'location': item['tweet'],
        'latitude': item[' latitude'],
        'longitude': item[' longitude'],
        'country': item['countrycode']
    } for item in json_data])


    def standardize_city(name):
        name = re.sub(r'[^\w\s]', '', str(name))
        return name.strip()

    df1['location'] = df1['location'].apply(standardize_city)
    df2['location'] = df2['location'].apply(standardize_city)

    df1.set_index('location', inplace=True)
    joined_data = df2.join(df1, on='location').dropna()
    # First count occurrences of each location
    joined_data['count'] = joined_data.groupby('location')['location'].transform('count')

    # Then drop duplicates while keeping the count column
    joined_data = joined_data.drop_duplicates(subset=['location'])
    joined_data = joined_data.reset_index(drop=True)
    
    joined_data['mag'] = np.random.uniform(4.0, 10.0, size=len(joined_data))
    joined_data['mag'] = joined_data['mag'].round(1)

    joined_data.to_csv('shakemap.csv', index=False)

    return joined_data

def add_to_M(locs):

    collection = db['allLocations']
    # Get existing locations from MongoDB collection
    existing_locations = pd.DataFrame(list(collection.find()))
    
    if len(existing_locations) > 0:
        # Merge existing and new locations
        merged_df = pd.concat([existing_locations, locs])
        
        # Group by location and aggregate counts
        result_df = merged_df.groupby('location').agg({
            'latitude': 'first',
            'longitude': 'first',
            'country': 'first',
            'count': 'sum',
            'mag': 'first'
        }).reset_index()
    else:
        # If no existing locations, use new locations as is
        result_df = locs.copy()
    
    # Update MongoDB collection with merged results
    collection.delete_many({})  # Clear existing documents
    collection.insert_many(result_df.to_dict('records'))

    print(pd.DataFrame(list(collection.find())).head())
    
    return result_df

def timeSeries(df):
    plot = df[["timestamp"]].rename(columns = {'timestamp': 'time'})
    plot.to_csv("timeSeries.csv", index=False)
    
df = download_tweets()

if df is not None:

    clean_tweet(df)
    print(df.head())

    # Extract locations from ALL tweets
    new_locations = extract_locations(df['cleaned_text'])
    print("=========================================================New location", new_locations)

    # Match locations to mark long and lat
    locs = match_location(new_locations)

    print(locs)

    add_to_M(locs)

    collection = db['saveTweets']
    # Get existing locations from MongoDB collection
    df = pd.DataFrame(list(collection.find()))
    #Export data to plot timeseries
    timeSeries(df)
