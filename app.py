from flask import Flask, request, jsonify
import psycopg2

app = Flask(__name__)

# PostgreSQL connection parameters
conn = psycopg2.connect(
    database="healthtydatabase",  # specify your database name
    user="postgres",  # your PostgreSQL username
    password="444",  # your PostgreSQL password
    host="localhost",
    port="5432"
)

# Route to handle form submission and specify the target table
@app.route('/submitForm', methods=['POST'])
def submit_form():
    data = request.get_json()

    # Extract form data
    first_name = data.get('fname')
    last_name = data.get('lname')
    age = data.get('age')
    weight = data.get('weight')
    height = data.get('height')
    complaints = data.get('complaints')

    # Insert the data into the correct PostgreSQL table
    cursor = conn.cursor()

    # Specify the table  for insertion
    cursor.execute("""
        INSERT INTO userdata (first_name, last_name, age, weight, height, complaints)
        VALUES (%s, %s, %s, %s, %s, %s)
    """, (first_name, last_name, age, weight, height, complaints))
    
    conn.commit()
    cursor.close()

    # Return success response
    return jsonify({'status': 'success'})


@app.route('/view_entries', methods=['GET'])
def view_entries():
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM userdata")
    entries = cursor.fetchall()
    cursor.close()

    # Convert the data into JSON format
    entry_list = []
    for entry in entries:
        entry_list.append({
            'id': entry[0],
            'first_name': entry[1],
            'last_name': entry[2],
            'age': entry[3],
            'weight': entry[4],
            'height': entry[5],
            'complaints': entry[6]
        })

    return jsonify(entry_list)
 
if __name__ == "__main__":
    app.run(debug=True)

