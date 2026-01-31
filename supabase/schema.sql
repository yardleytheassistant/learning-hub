-- Supabase Database Schema for Learning Hub
-- Run this in Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (extends Supabase auth)
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT UNIQUE NOT NULL,
    name TEXT,
    avatar_url TEXT,
    streak_days INTEGER DEFAULT 0,
    daily_goal_minutes INTEGER DEFAULT 30,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Courses table
CREATE TABLE courses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT,
    category TEXT,
    difficulty TEXT CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')),
    thumbnail_url TEXT,
    total_lessons INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Chapters table
CREATE TABLE chapters (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
    chapter_number INTEGER NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    pdf_path TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Quizzes table
CREATE TABLE quizzes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    chapter_id UUID REFERENCES chapters(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    questions_count INTEGER DEFAULT 5,
    time_estimate_minutes INTEGER DEFAULT 5,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Questions table
CREATE TABLE questions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    quiz_id UUID REFERENCES quizzes(id) ON DELETE CASCADE,
    question_number INTEGER NOT NULL,
    question TEXT NOT NULL,
    options JSONB NOT NULL, -- ["A) option1", "B) option2", ...]
    correct_answer INTEGER NOT NULL, -- 0, 1, 2, or 3
    explanation TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User progress table
CREATE TABLE user_progress (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    lesson_id TEXT NOT NULL,
    completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Quiz attempts table
CREATE TABLE quiz_attempts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    quiz_id UUID REFERENCES quizzes(id) ON DELETE CASCADE,
    score INTEGER NOT NULL,
    correct_count INTEGER NOT NULL,
    total_questions INTEGER NOT NULL,
    completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User goals table
CREATE TABLE goals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    goal_type TEXT NOT NULL CHECK (goal_type IN ('daily', 'weekly')),
    target INTEGER NOT NULL,
    deadline TIMESTAMP WITH TIME ZONE,
    completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Daily study log table
CREATE TABLE daily_study (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    minutes_studied INTEGER DEFAULT 0,
    lessons_completed INTEGER DEFAULT 0,
    quizzes_completed INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, date)
);

-- Create indexes for performance
CREATE INDEX idx_chapters_course_id ON chapters(course_id);
CREATE INDEX idx_quizzes_chapter_id ON quizzes(chapter_id);
CREATE INDEX idx_questions_quiz_id ON questions(quiz_id);
CREATE INDEX idx_user_progress_user_id ON user_progress(user_id);
CREATE INDEX idx_quiz_attempts_user_id ON quiz_attempts(user_id);
CREATE INDEX idx_daily_study_user_date ON daily_study(user_id, date);

-- Enable Row Level Security (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE chapters ENABLE ROW LEVEL SECURITY;
ALTER TABLE quizzes ENABLE ROW LEVEL SECURITY;
ALTER TABLE questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_study ENABLE ROW LEVEL SECURITY;

-- RLS Policies (simplified - allow authenticated users full access)
-- In production, you'd want more restrictive policies
CREATE POLICY "Allow authenticated access" ON users FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow public read" ON courses FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON chapters FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON quizzes FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON questions FOR SELECT USING (true);
CREATE POLICY "Allow authenticated access" ON user_progress FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated access" ON quiz_attempts FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated access" ON goals FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated access" ON daily_study FOR ALL USING (auth.role() = 'authenticated');

-- Insert sample courses (IS Powerpoints content)
INSERT INTO courses (title, description, category, difficulty) VALUES
('IS 601 - Information Systems', 'Foundational concepts in information systems, databases, and business technology.', 'MBA', 'beginner'),
('MKTG 500 - Marketing Fundamentals', 'Introduction to marketing strategies, consumer behavior, and market research.', 'MBA', 'beginner'),
('HRM 652 - Human Resource Management', 'Strategic HR management, talent acquisition, and organizational development.', 'MBA', 'intermediate');

-- Insert chapters for IS 601 (Chapter 1)
INSERT INTO chapters (course_id, chapter_number, title, description, pdf_path) VALUES
((SELECT id FROM courses WHERE title LIKE 'IS 601%'), 1, 'Introduction to Information Systems', 'Overview of information systems in organizations', '/Users/yardleytoth/Desktop/IS Powerpoints/Ch_01.pdf'),
((SELECT id FROM courses WHERE title LIKE 'IS 601%'), 2, 'Database Management Systems', 'Introduction to databases and DBMS', '/Users/yardleytoth/Desktop/IS Powerpoints/Ch_02.pdf'),
((SELECT id FROM courses WHERE title LIKE 'IS 601%'), 3, 'Networks and Telecommunications', 'Computer networks and communication protocols', '/Users/yardleytoth/Desktop/IS Powerpoints/Ch_03.pdf'),
((SELECT id FROM courses WHERE title LIKE 'IS 601%'), 4, 'Enterprise Systems', 'ERP, CRM, and business process integration', '/Users/yardleytoth/Desktop/IS Powerpoints/Ch_04.pdf'),
((SELECT id FROM courses WHERE title LIKE 'IS 601%'), 5, 'E-Commerce and Digital Business', 'Online business models and digital transformation', '/Users/yardleytoth/Desktop/IS Powerpoints/Ch_05.pdf');

-- Insert quizzes for Chapter 1
INSERT INTO quizzes (chapter_id, title, questions_count, time_estimate_minutes) VALUES
((SELECT id FROM chapters WHERE chapter_number = 1 AND pdf_path LIKE '%Ch_01%'), 'Introduction to IS Quiz', 5, 5),
((SELECT id FROM chapters WHERE chapter_number = 2 AND pdf_path LIKE '%Ch_02%'), 'Database Management Quiz', 5, 5),
((SELECT id FROM chapters WHERE chapter_number = 3 AND pdf_path LIKE '%Ch_03%'), 'Networks Quiz', 5, 6),
((SELECT id FROM chapters WHERE chapter_number = 4 AND pdf_path LIKE '%Ch_04%'), 'Enterprise Systems Quiz', 5, 6),
((SELECT id FROM chapters WHERE chapter_number = 5 AND pdf_path LIKE '%Ch_05%'), 'E-Commerce Quiz', 5, 5);

-- Insert sample questions for Chapter 1 Quiz
INSERT INTO questions (quiz_id, question_number, question, options, correct_answer, explanation) VALUES
((SELECT id FROM quizzes WHERE title = 'Introduction to IS Quiz'), 1, 
 'What is the primary purpose of an Information System in an organization?',
 '["A) To provide entertainment for employees", "B) To collect, process, store, and distribute information", "C) To replace all manual labor processes", "D) To increase company revenue directly"]',
 1,
 'Information Systems are designed to collect, process, store, and distribute information to support decision-making, coordination, and control in organizations.'),
((SELECT id FROM quizzes WHERE title = 'Introduction to IS Quiz'), 2, 
 'Which of the following is NOT typically considered a component of an Information System?',
 '["A) People", "B) Processes", "C) Technology", "D) Office furniture"]',
 3,
 'The five components of an IS are: people, processes, technology, data, and information. Office furniture is not a core component.'),
((SELECT id FROM quizzes WHERE title = 'Introduction to IS Quiz'), 3, 
 'What does IT stand for in the context of business organizations?',
 '["A) International Trade", "B) Information Technology", "C) Industrial Tools", "D) Integrated Transactions"]',
 1,
 'IT stands for Information Technology, referring to the use of computers, networks, and software to manage and process information.'),
((SELECT id FROM quizzes WHERE title = 'Introduction to IS Quiz'), 4, 
 'Which type of Information System helps managers make strategic decisions?',
 '["A) Transaction Processing System (TPS)", "B) Management Information System (MIS)", "C) Decision Support System (DSS)", "D) Office Automation System (OAS)"]',
 2,
 'Decision Support Systems (DSS) are designed to help managers analyze complex situations, evaluate alternatives, and make strategic decisions.'),
((SELECT id FROM quizzes WHERE title = 'Introduction to IS Quiz'), 5, 
 'What is the key difference between data and information?',
 '["A) Data is processed, information is raw", "B) Information is processed data that has meaning and context", "C) They mean the same thing", "D) Data is only numbers, information is only text"]',
 1,
 'Data refers to raw facts and figures without context, while information is processed, organized data that has meaning and is useful for decision-making.');

-- Insert questions for Chapter 2 Quiz (Database)
INSERT INTO questions (quiz_id, question_number, question, options, correct_answer, explanation) VALUES
((SELECT id FROM quizzes WHERE title = 'Database Management Quiz'), 1, 
 'What is a database?',
 '["A) A collection of unrelated files", "B) An organized collection of related, logically coherent data", "C) A type of spreadsheet software", "D) A computer program for typing"]',
 1,
 'A database is an organized collection of related, logically coherent data that is used by applications and accessed by users.'),
((SELECT id FROM quizzes WHERE title = 'Database Management Quiz'), 2, 
 'What does DBMS stand for?',
 '["A) Data Management and Security System", "B) Database Management System", "C) Digital Business Management Software", "D) Data Base Manipulation System"]',
 1,
 'DBMS stands for Database Management System, which is software that allows users to define, create, maintain, and control access to databases.'),
((SELECT id FROM quizzes WHERE title = 'Database Management Quiz'), 3, 
 'What is a primary key in a database?',
 '["A) The most important column in a table", "B) A unique identifier for each record in a table", "C) The first column added to a table", "D) A key that opens the database"]',
 1,
 'A primary key is a unique identifier (like a student ID or employee number) that uniquely identifies each record in a database table.'),
((SELECT id FROM quizzes WHERE title = 'Database Management Quiz'), 4, 
 'What is SQL used for in database management?',
 '["A) Statistical Quality Leadership", "B) Structured Query Language for managing databases", "C) Simple Question Language", "D) Server Queue Logging"]',
 1,
 'SQL (Structured Query Language) is a standard language used to communicate with and manage relational databases.'),
((SELECT id FROM quizzes WHERE title = 'Database Management Quiz'), 5, 
 'What is data redundancy?',
 '["A) Having backup copies of data", "B) Duplicate data stored in multiple places", "C) Reducing the amount of stored data", "D) A type of data compression"]',
 1,
 'Data redundancy occurs when the same data is stored in multiple locations, which can lead to inconsistency and wasted storage space.');

-- Insert questions for Chapter 3 Quiz (Networks)
INSERT INTO questions (quiz_id, question_number, question, options, correct_answer, explanation) VALUES
((SELECT id FROM quizzes WHERE title = 'Networks Quiz'), 1, 
 'What is a computer network?',
 '["A) A group of computers connected to share resources and information", "B) A type of computer virus", "C) A single computer with multiple users", "D) A cable that connects to the internet"]',
 0,
 'A computer network is a group of interconnected computers that communicate and share resources, information, and applications.'),
((SELECT id FROM quizzes WHERE title = 'Networks Quiz'), 2, 
 'What does LAN stand for?',
 '["A) Large Area Network", "B) Local Area Network", "C) Long Access Network", "D) Linked Array Node"]',
 1,
 'LAN (Local Area Network) is a network that connects computers within a limited area like a home, office, or building.'),
((SELECT id FROM quizzes WHERE title = 'Networks Quiz'), 3, 
 'What is the purpose of a router in a network?',
 '["A) To connect computers to electrical power", "B) To direct data packets between different networks", "C) To store files permanently", "D) To print documents"]',
 1,
 'A router is a networking device that directs data packets between different networks, determining the best path for data transmission.'),
((SELECT id FROM quizzes WHERE title = 'Networks Quiz'), 4, 
 'What does TCP/IP stand for?',
 '["A) Transmission Control Protocol/Internet Protocol", "B) Technical Computer Process/Internet Provider", "C) Total Connection Protocol/Internal Path", "D) Telephone Connection Protocol/Internet Path"]',
 0,
 'TCP/IP (Transmission Control Protocol/Internet Protocol) is the fundamental communication protocol suite that enables data exchange across the internet.'),
((SELECT id FROM quizzes WHERE title = 'Networks Quiz'), 5, 
 'What is the difference between the internet and the web?',
 '["A) They are the same thing", "B) The web is a service that runs on the internet", "C) The internet is a service that runs on the web", "D) The web is faster than the internet"]',
 1,
 'The internet is the global network infrastructure, while the World Wide Web is one of many services (along with email, FTP, etc.) that runs on the internet.');

-- Insert questions for Chapter 4 Quiz (Enterprise Systems)
INSERT INTO questions (quiz_id, question_number, question, options, correct_answer, explanation) VALUES
((SELECT id FROM quizzes WHERE title = 'Enterprise Systems Quiz'), 1, 
 'What is an Enterprise Resource Planning (ERP) system?',
 '["A) A system for planning employee vacations", "B) Integrated software that manages core business processes", "C) A type of spreadsheet for budgets", "D) A customer relationship database"]',
 1,
 'ERP (Enterprise Resource Planning) systems are integrated software suites that manage and automate core business processes like finance, HR, manufacturing, and supply chain.'),
((SELECT id FROM quizzes WHERE title = 'Enterprise Systems Quiz'), 2, 
 'What is a business process?',
 '["A) A procedure for hiring new employees", "B) A set of related activities that accomplish a specific goal", "C) A document describing company policies", "D) A type of software license"]',
 1,
 'A business process is a set of logically related activities or tasks that, together, accomplish a specific organizational goal or business objective.'),
((SELECT id FROM quizzes WHERE title = 'Enterprise Systems Quiz'), 3, 
 'What is the main benefit of Business Process Reengineering (BPR)?',
 '["A) Making small improvements to existing processes", "B) Fundamental rethinking and radical redesign of processes", "C) Automating only manual tasks", "D) Reducing employee headcount"]',
 1,
 'BPR (Business Process Reengineering) involves the fundamental rethinking and radical redesign of business processes to achieve dramatic improvements in critical areas.'),
((SELECT id FROM quizzes WHERE title = 'Enterprise Systems Quiz'), 4, 
 'What is supply chain management?',
 '["A) Managing suppliers computer networks", "B) The flow of goods, information, and finances across the entire supply chain", "C) A software for tracking delivery trucks", "D) A type of inventory counting method"]',
 1,
 'Supply chain management involves the coordination and management of the flow of goods, information, and finances from suppliers to manufacturers to retailers to consumers.'),
((SELECT id FROM quizzes WHERE title = 'Enterprise Systems Quiz'), 5, 
 'What is Customer Relationship Management (CRM)?',
 '["A) A system for managing customer relationships and interactions", "B) A legal document for customer agreements", "C) A type of survey questionnaire", "D) A method for calculating customer discounts"]',
 0,
 'CRM (Customer Relationship Management) systems help organizations manage and analyze customer interactions, track customer data, and improve business relationships.');

-- Insert questions for Chapter 5 Quiz (E-Commerce)
INSERT INTO questions (quiz_id, question_number, question, options, correct_answer, explanation) VALUES
((SELECT id FROM quizzes WHERE title = 'E-Commerce Quiz'), 1, 
 'What is E-Commerce?',
 '["A) Buying and selling goods and services over the internet", "B) Electronic communication between businesses", "C) A type of email marketing", "D) Online banking only"]',
 0,
 'E-Commerce refers to the buying and selling of goods, services, and information over the internet and other electronic networks.'),
((SELECT id FROM quizzes WHERE title = 'E-Commerce Quiz'), 2, 
 'What does B2B stand for in e-commerce?',
 '["A) Business to Business", "B) Business to Consumer", "C) Business to Government", "D) Back to Basics"]',
 0,
 'B2B (Business to Business) e-commerce involves transactions between businesses, such as a manufacturer buying supplies from a wholesaler.'),
((SELECT id FROM quizzes WHERE title = 'E-Commerce Quiz'), 3, 
 'What is a digital marketplace?',
 '["A) A physical store that sells digital products", "B) An online platform that connects buyers and sellers", "C) A government website for business licenses", "D) A type of payment processor"]',
 1,
 'A digital marketplace is an online platform (like Amazon, eBay, or Etsy) that connects multiple buyers and sellers, facilitating transactions between them.'),
((SELECT id FROM quizzes WHERE title = 'E-Commerce Quiz'), 4, 
 'What is one advantage of e-commerce for consumers?',
 '["A) Higher prices than physical stores", "B) Limited product selection", "C) 24/7 availability and convenience", "D) Only cash payments accepted"]',
 2,
 'E-commerce offers consumers the convenience of shopping anytime, anywhere, with access to a wide variety of products and competitive pricing.'),
((SELECT id FROM quizzes WHERE title = 'E-Commerce Quiz'), 5, 
 'What is m-commerce?',
 '["A) Mail commerce", "B) Mobile commerce conducted via smartphones and tablets", "C) Manual commerce", "D) Multi-level commerce"]',
 1,
 'M-Commerce (Mobile Commerce) refers to e-commerce transactions conducted through mobile devices like smartphones and tablets.');

SELECT 'Database schema created successfully!' AS status;
