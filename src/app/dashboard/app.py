import os
import json
from flask import Flask, jsonify, send_from_directory
import pandas as pd
import plotly.express as px
import folium
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/run-script", methods=["GET"])
def run_script():
    try:
        # Load and process data
        shakemap_data = pd.read_csv("shakemap.csv")
        datasets = {
            "Japan": {"path": 'japan_predictions.csv', "color": 'green', "title": "Japan Earthquake Tweets"},
            "Haiti": {"path": 'haiti_predictions.csv', "color": 'blue', "title": "Haiti Earthquake Tweets"},
            "Iraq-Iran": {"path": 'iraq_iran_predictions.csv', "color": 'red', "title": "Iraq-Iran Earthquake Tweets"},
            "Turkey": {"path": 'turkey_predictions (1).csv', "color": 'orange', "title": "Turkey Earthquake Tweets"},
            "Mexico": {"path": 'maxico_predictions.csv', "color": 'purple', "title": "Mexico Earthquake Tweets"}
        }

        # Generate time series plots and save as HTML
        for name, info in datasets.items():
            data = pd.read_csv(info["path"]).groupby('date').count().reset_index()
            fig = px.line(data, x='date', y='text', title=info["title"], line_shape='linear')
            fig.update_traces(line=dict(color=info["color"]), mode='lines+markers')
            fig.write_html(f"graph/{name}_time_series.html")

        # Generate the scatter geo map
        m = folium.Map(location=[20, 0], zoom_start=2)
        for _, entry in shakemap_data.iterrows():
            magnitude = entry['mag']
            color = 'red' if magnitude >= 9 else 'yellow' if magnitude >= 8 else 'green'
            folium.CircleMarker(
                location=[entry['latitude'], entry['longitude']],
                radius=2, popup=f"Mag: {magnitude}",
                color=color, fill=True, fill_color=color, fill_opacity=0.4
            ).add_to(m)
        m.save(os.path.join(app.root_path, "scatter_geo_map.html"))
        print("Map saved at:", os.path.join(app.root_path, "scatter_geo_map.html"))

        return jsonify({"message": "Script executed and HTML files generated successfully."})
    except Exception as e:
        print(f"Error: {e}")
        # traceback.print_exc() 
        return jsonify({"error": "An error occurred"}), 500

@app.route('/runPyscript', methods=['GET'])
def runPyscript():
    # Replace 'your_script.py' with the actual script name
    script_path = os.path.join(os.getcwd(), 'app_new.py')
    try:
        exec(open(script_path).read())  # Executes the script
        return jsonify({'status': 'success', 'message': 'Script executed successfully'})
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)})

# Route to serve the scatter_geo_map.html file from the dashboard directory
@app.route('/scatter_geo_map')
def scatter_geo_map():
    print("hello ji")
    print("App root path:", app.root_path)
    return send_from_directory(app.root_path, 'scatter_geo_map.html')

@app.route('/shakemap_data', methods=["GET"])
def shakemap_data():
    # Load CSV and check column names
    shakemap_data = pd.read_csv("shakemap.csv")  # Ensure CSV has 'latitude', 'longitude', 'mag' columns
    # Convert the DataFrame to a list of dictionaries
    data = shakemap_data.to_dict(orient="records")
    return jsonify(data)  # Return as JSON

@app.route('/data/<dataset>', methods=['GET'])
def serve_data(dataset):
    try:
        data = pd.read_csv(f"{dataset}.csv").groupby('date').count().reset_index()
        data['date'] = data['date'].astype(str)  # Convert dates to strings if not already
        json_data = data.to_json(orient='records')
        return jsonify(json.loads(json_data))
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"error": "Data not found"}), 404

@app.route('/data/timeSeries', methods=['GET'])
def get_time_series():
    try:
        # Load the CSV file
        df = pd.read_csv('timeSeries.csv')  # Replace 'data.csv' with your actual file path
        
        # Ensure the CSV contains the expected column
        if 'time' not in df.columns:
            return jsonify({"error": "CSV file does not contain a 'time' column"}), 400
        
        # Convert the 'time' column to a list
        time_series = df['time'].tolist()
        
        # Return the data as JSON
        return jsonify({"timeSeries": time_series})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# @app.route('/data/<dataset>', methods=['GET'])
# def serve_data(dataset):
#     try:
#         if dataset == "timeSeries":
#             # Read the CSV file
#             data = pd.read_csv("timeSeries.csv")
            
#             # Convert the 'time' column to a datetime format
#             data['time'] = pd.to_datetime(data['time'])

#             # If needed, count occurrences (though unnecessary for unique timestamps)
#             # For this data, we just return the timestamps
#             json_data = data.to_json(orient='records', date_format='iso')
#             return jsonify(json.loads(json_data))  # Return JSON response
#         else:
#             return jsonify({"error": "Dataset not authorized"}), 403
#     except FileNotFoundError:
#         return jsonify({"error": "File not found"}), 404
#     except Exception as e:
#         print(f"Error: {e}")
#         return jsonify({"error": "An error occurred"}), 500

@app.route('/graph/<path:filename>', methods=['GET'])
def serve_graph(filename):
    return send_from_directory('graph', filename)

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, debug=True)
