from flask import Flask, request, render_template, redirect, url_for
import psycopg2

app = Flask(__name__)

# Database connection
def get_db_connection():
    # Replace these with your PostgreSQL database credentials
    conn = psycopg2.connect(
        database="postgresql://postgres:PFoxfDmJapWUQybiBFkHadkANFqZLMGM@monorail.proxy.rlwy.net:15894/railway",
        user="postgres",
        password="PFoxfDmJapWUQybiBFkHadkANFqZLMGM",
        host="monorail.proxy.rlwy.net:15894",
        port="5432"
    )
    return conn

# Home page
@app.route('/')
def home():
    # Connect to the database and retrieve posts
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("SELECT username, content FROM posts ORDER BY id DESC")
    posts = cur.fetchall()
    cur.close()
    conn.close()
    
    # Render the home page with the posts
    return render_template('home.html', posts=posts)

# Route for handling form submissions
@app.route('/post', methods=['POST'])
def post():
    # Get the form data
    username = request.form['username']
    content = request.form['content']

    # Connect to the database and insert a new post
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("INSERT INTO posts (username, content) VALUES (%s, %s)", (username, content))
    conn.commit()
    cur.close()
    conn.close()
    
    # Redirect to the home page
    return redirect(url_for('home'))

# Run the app
if __name__ == '__main__':
    app.run(debug=True)
