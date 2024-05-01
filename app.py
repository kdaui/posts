from flask import Flask, request, render_template, redirect, url_for
import os
import psycopg2

# Create a Flask application
app = Flask(__name__)

# Retrieve database credentials from environment variables
database_url = os.getenv('DATABASE_URL')

# Establish a connection to the PostgreSQL database
connection = psycopg2.connect(database_url)
cursor = connection.cursor()

# Create a table for storing posts if it doesn't already exist
cursor.execute("""
    CREATE TABLE IF NOT EXISTS posts (
        id SERIAL PRIMARY KEY,
        username TEXT NOT NULL,
        content TEXT NOT NULL
    );
""")
connection.commit()

# Define the home page route
@app.route('/')
def home():
    # Retrieve posts from the database
    cursor.execute("SELECT username, content FROM posts ORDER BY id DESC")
    posts = cursor.fetchall()
    # Render the home.html template and pass the posts to it
    return render_template('home.html', posts=posts)

# Define the route for handling form submissions
@app.route('/post', methods=['POST'])
def post():
    # Retrieve username and content from the form submission
    username = request.form['username']
    content = request.form['content']
    
    # Insert the new post into the database
    cursor.execute("INSERT INTO posts (username, content) VALUES (%s, %s)", (username, content))
    connection.commit()
    
    # Redirect to the home page after saving the post
    return redirect(url_for('home'))

# Get the port number from the PORT environment variable or default to 5000
port = int(os.environ.get('PORT', 5000))

# Run the app on the specified port and allow connections from all network interfaces
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=port)