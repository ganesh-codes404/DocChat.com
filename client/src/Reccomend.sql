-- Drop existing tables if they exist
DROP TABLE IF EXISTS patient_symptoms CASCADE;
DROP TABLE IF EXISTS symptoms CASCADE;
DROP TABLE IF EXISTS patients CASCADE;

-- Create the patients table
CREATE TABLE patients (
    patient_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    age INTEGER NOT NULL,
    gender VARCHAR(10),
    city VARCHAR(50),
    phone_number VARCHAR(15),
    email VARCHAR(100)
);

-- Create the symptoms table
CREATE TABLE symptoms (
    symptom_id SERIAL PRIMARY KEY,
    symptom_name VARCHAR(50) NOT NULL,
    intensity VARCHAR(10) CHECK (intensity IN ('mild', 'medium', 'heavy'))
);

-- Create the patient_symptoms table
CREATE TABLE patient_symptoms (
    record_id SERIAL PRIMARY KEY,
    patient_id INTEGER REFERENCES patients(patient_id),
    symptom_id INTEGER REFERENCES symptoms(symptom_id),
    description TEXT
);

-- Insert sample data into patients
INSERT INTO patients (name, age, gender, city, phone_number, email)
VALUES 
    ('John Doe', 30, 'male', 'New York', '123-456-7890', 'john.doe@example.com'),
    ('Jane Smith', 28, 'female', 'San Francisco', '234-567-8901', 'jane.smith@example.com'),
    ('Alice Johnson', 25, 'female', 'Chicago', '345-678-9012', 'alice.j@example.com'),
    ('Bob Brown', 40, 'male', 'Houston', '456-789-0123', 'bob.b@example.com'),
    ('Carol White', 35, 'female', 'Los Angeles', '567-890-1234', 'carol.w@example.com'),
    ('Dave Green', 29, 'male', 'Miami', '678-901-2345', 'dave.g@example.com'),
    ('Eve Black', 33, 'female', 'Denver', '789-012-3456', 'eve.b@example.com'),
    ('Frank Blue', 45, 'male', 'Seattle', '890-123-4567', 'frank.b@example.com'),
    ('Grace Gold', 27, 'female', 'Boston', '901-234-5678', 'grace.g@example.com'),
    ('Hank Gray', 32, 'male', 'Atlanta', '012-345-6789', 'hank.g@example.com');

-- Insert sample data into symptoms
INSERT INTO symptoms (symptom_name, intensity)
VALUES 
    ('nausea', 'mild'), ('nausea', 'medium'), ('nausea', 'heavy'),
    ('headache', 'mild'), ('headache', 'medium'), ('headache', 'heavy'),
    ('body pains', 'mild'), ('body pains', 'medium'), ('body pains', 'heavy'),
    ('fever', 'mild'), ('fever', 'medium'), ('fever', 'heavy'),
    ('breathlessness', 'mild'), ('breathlessness', 'medium'), ('breathlessness', 'heavy');

-- Insert sample data into patient_symptoms
INSERT INTO patient_symptoms (patient_id, symptom_id, description)
VALUES 
    -- John Doe - Low Risk (all mild symptoms)
    (1, (SELECT symptom_id FROM symptoms WHERE symptom_name = 'nausea' AND intensity = 'mild'), 'Mild queasiness in the morning'),
    (1, (SELECT symptom_id FROM symptoms WHERE symptom_name = 'headache' AND intensity = 'mild'), 'Mild headache at night'),
    (1, (SELECT symptom_id FROM symptoms WHERE symptom_name = 'body pains' AND intensity = 'mild'), 'Mild muscle ache'),

    -- Jane Smith - Low Risk (2 medium symptoms, rest mild)
    (2, (SELECT symptom_id FROM symptoms WHERE symptom_name = 'nausea' AND intensity = 'medium'), 'Feeling nauseous occasionally'),
    (2, (SELECT symptom_id FROM symptoms WHERE symptom_name = 'headache' AND intensity = 'mild'), 'Mild headache'),
    (2, (SELECT symptom_id FROM symptoms WHERE symptom_name = 'body pains' AND intensity = 'medium'), 'Occasional body aches'),

    -- Alice Johnson - Medium Risk (3 medium symptoms)
    (3, (SELECT symptom_id FROM symptoms WHERE symptom_name = 'nausea' AND intensity = 'medium'), 'Moderate queasiness'),
    (3, (SELECT symptom_id FROM symptoms WHERE symptom_name = 'headache' AND intensity = 'medium'), 'Moderate headache'),
    (3, (SELECT symptom_id FROM symptoms WHERE symptom_name = 'fever' AND intensity = 'medium'), 'Moderate fever'),

    -- Bob Brown - High Risk (2 heavy symptoms)
    (4, (SELECT symptom_id FROM symptoms WHERE symptom_name = 'fever' AND intensity = 'heavy'), 'High fever'),
    (4, (SELECT symptom_id FROM symptoms WHERE symptom_name = 'breathlessness' AND intensity = 'heavy'), 'Severe breathlessness'),

    -- Carol White - Medium Risk (1 heavy and some mild symptoms)
    (5, (SELECT symptom_id FROM symptoms WHERE symptom_name = 'headache' AND intensity = 'mild'), 'Mild headache'),
    (5, (SELECT symptom_id FROM symptoms WHERE symptom_name = 'nausea' AND intensity = 'mild'), 'Mild nausea'),
    (5, (SELECT symptom_id FROM symptoms WHERE symptom_name = 'body pains' AND intensity = 'heavy'), 'Severe body pain'),

    -- And so on for the remaining patients with varying combinations...
    (6, (SELECT symptom_id FROM symptoms WHERE symptom_name = 'nausea' AND intensity = 'medium'), 'Moderate nausea'),
    (7, (SELECT symptom_id FROM symptoms WHERE symptom_name = 'headache' AND intensity = 'heavy'), 'Severe headache'),
    (8, (SELECT symptom_id FROM symptoms WHERE symptom_name = 'fever' AND intensity = 'heavy'), 'High fever after workout'),
    (9, (SELECT symptom_id FROM symptoms WHERE symptom_name = 'body pains' AND intensity = 'mild'), 'Body pains'),
    (10, (SELECT symptom_id FROM symptoms WHERE symptom_name = 'breathlessness' AND intensity = 'medium'), 'Struggling with breath during activity');

-- Drop existing function if it exists
DROP FUNCTION IF EXISTS calculate_risk_level(integer);

-- Create the risk calculation function
CREATE OR REPLACE FUNCTION calculate_risk_level(p_id INT)
RETURNS VARCHAR AS $$
DECLARE
    mild_count INT;
    medium_count INT;
    heavy_count INT;
BEGIN
    -- Count symptom intensities for the patient
    SELECT 
        COUNT(CASE WHEN s.intensity = 'mild' THEN 1 END),
        COUNT(CASE WHEN s.intensity = 'medium' THEN 1 END),
        COUNT(CASE WHEN s.intensity = 'heavy' THEN 1 END)
    INTO mild_count, medium_count, heavy_count
    FROM patient_symptoms ps
    JOIN symptoms s ON ps.symptom_id = s.symptom_id
    WHERE ps.patient_id = p_id;

    -- Determine risk level based on counts
    IF heavy_count >= 2 THEN
        RETURN 'high risk';
    ELSIF heavy_count = 1 OR medium_count >= 3 THEN
        RETURN 'medium risk';
    ELSIF medium_count <= 2 AND heavy_count = 0 THEN
        RETURN 'low risk';
    ELSE
        RETURN 'unknown';
    END IF;
END;
$$ LANGUAGE plpgsql;

-- Create the view to assess overall risk
CREATE OR REPLACE VIEW patient_overall_risk AS
SELECT 
    p.patient_id,
    p.name AS patient_name,
    calculate_risk_level(p.patient_id) AS overall_risk
FROM 
    patients p;

-- Select from the view to see results
SELECT * FROM patient_overall_risk;

-- Drop existing doctors table if it exists
DROP TABLE IF EXISTS doctors CASCADE;

-- Create the doctors table
CREATE TABLE doctors (
    doctor_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    specialization VARCHAR(100) NOT NULL,
    years_of_experience INT NOT NULL
);

-- Create a view to include the risk level based on years of experience
CREATE OR REPLACE VIEW doctor_risk_view AS
SELECT 
    d.doctor_id,
    d.name,
    d.specialization,
    d.years_of_experience,
    CASE 
        WHEN d.years_of_experience < 5 THEN 'low risk'
        WHEN d.years_of_experience BETWEEN 5 AND 10 THEN 'medium risk'
        ELSE 'high risk'
    END AS risk_level
FROM doctors d;

-- Insert sample data into doctors
INSERT INTO doctors (name, specialization, years_of_experience)
VALUES 
    ('Dr. Emily Watson', 'Pediatrics', 3),
    ('Dr. Robert Brown', 'Cardiology', 6),
    ('Dr. Sarah Lee', 'Neurology', 11),
    ('Dr. Michael Johnson', 'General Practice', 8),
    ('Dr. Jessica Chen', 'Oncology', 4),
    ('Dr. David Smith', 'Orthopedics', 15),
    ('Dr. Laura White', 'Dermatology', 2),
    ('Dr. Kevin Adams', 'Psychiatry', 7),
    ('Dr. Rachel Green', 'Gastroenterology', 10),
    ('Dr. James Black', 'Emergency Medicine', 12);

-- Select all doctors from the view to see the data with risk levels
SELECT * FROM doctor_risk_view;

-- Join patients and doctors based on risk levels, selecting specific columns
SELECT 
    prv.patient_name,
    prv.age,
    prv.gender,
    d.name AS doctor_name,
    d.years_of_experience,
    prv.risk_level AS patient_risk_level,
    d.risk_level AS doctor_risk_level
FROM 
    patient_risk_view prv
JOIN 
    doctor_risk_view d ON prv.risk_level = d.risk_level;