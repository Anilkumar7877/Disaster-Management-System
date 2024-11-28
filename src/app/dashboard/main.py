import schedule
import time
import subprocess
from datetime import datetime
from multiprocessing import Process, freeze_support

def run_app():
    print("\nStarting app_new.py execution...", flush=True)
    process = subprocess.Popen(
        "python app_new.py",
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        shell=True,
        text=True,
        bufsize=1
    )
    
    while True:
        output = process.stdout.readline()
        if output:
            print(output.strip(), flush=True)
        if process.poll() is not None:
            break

def run_flask():
    print("Starting Flask Server...", flush=True)
    subprocess.run("python app.py", shell=True)

def run_scheduled():
    p = Process(target=run_app)
    p.start()

def display_next_run():
    next_run = schedule.next_run()
    if next_run:
        time_remaining = (next_run - datetime.now()).total_seconds()
        hours = int(time_remaining // 3600)
        minutes = int((time_remaining % 3600) // 60)
        seconds = int(time_remaining % 60)
        print(f"Next run in {hours:02d}:{minutes:02d}:{seconds:02d}", end='\r')
    else:
        print("No scheduled runs", end='\r')

if __name__ == '__main__':
    freeze_support()
    
    # Start Flask server once
    flask_process = Process(target=run_flask)
    flask_process.start()
    print("Flask server started successfully!", flush=True)
    
    # Schedule app_new.py runs
    schedule.every(30).minutes.do(run_scheduled)
    run_scheduled()  # Run immediately first time
    
    while True:
        schedule.run_pending()
        display_next_run()
        time.sleep(1)
