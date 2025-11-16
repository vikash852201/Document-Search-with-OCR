# 📄 DocuSearch Search With OCR

Document Search is a powerful **MERN-based OCR Platform** that allows users to upload documents, extract text via **Tesseract OCR**, store them securely in **MongoDB**, and perform **fast keyword searches with highlighting**.  
The platform includes **authentication**, **drag & drop uploads**, **search previews**, **document management**, and a modern **React Dashboard UI**.

---

# 🌟 Key Features

## 🔐 Authentication System
- JWT-based login & registration  
- Protected dashboard routes

---

## 📤 Advanced Document Upload
- Drag & Drop upload box  
- Multer-based file handling  
- Real-time upload progress  
- Auto OCR text extraction  
- Extracted text saved in MongoDB

---

## 🔍 Smart Document Search
- Regex-powered searching  
- Highlight matched text in results  
- Fast database queries with text indexing  
- Search preview cards with snippet view

---

## 📚 Document Dashboard
- Full list of OCR documents  
- Preview modal with scroll  
- Delete documents  
- Reprocess OCR (mock simulation)  
- Timestamp tracking  

---

## 🖥️ Modern React Frontend
- Tailwind CSS styling  
- Responsive UI  
- Intuitive dashboard layout  
- Modular, clean structure  

---

# 🛠️ Tech Stack

## Frontend
- React.js  
- Tailwind CSS  
- Axios  
- React Router  
- Context API  

## Backend
- Node.js / Express.js  
- Multer  
- Tesseract.js  
- JSON Web Tokens  
- MongoDB

---

# 📁 Project Structure

```
project/
│── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── uploads/
│   ├── server.js
│   └── db.js
│
└── frontend/
    ├── components/
    ├── pages/
    ├── layouts/
    ├── context/
    ├── App.js
    └── index.js
```

---

# ⚙️ Installation & Setup

## 1️⃣ Clone the Repository
```
git clone https://github.com/Premkr12/Document-Search-with-ocr
cd project
```

---

# 🗄️ Backend Setup

```
cd backend
npm install
```

### Create `.env`:
```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

Start Backend:
```
npm start
```

Runs on:  
👉 **http://localhost:5000**

---

# 🖥️ Frontend Setup

```
cd frontend
npm install
npm start
```

Runs on:  
👉 **http://localhost:3000**

---

# 🔌 API Endpoints

## 🔐 Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/users/register` | Register user |
| POST | `/api/users/login` | Login user |

---

## 📄 OCR Actions
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/ocr/upload` | Upload document & extract text |
| POST | `/api/ocr/search` | Search extracted text |
| GET | `/api/ocr/list` | List all OCR documents |
| DELETE | `/api/ocr/delete/:id` | Delete a document |
| PUT | `/api/ocr/reprocess/:id` | Reprocess OCR (mock) |

---

# 🎯 How It Works (Internals)

1. File is uploaded via drag & drop  
2. Multer stores the file temporarily  
3. Tesseract.js performs OCR on the uploaded image  
4. Extracted text is saved in MongoDB  
5. MongoDB text index improves search speed  
6. SearchPage.jsx highlights matched text for better UX  

---



```

# 🤝 Contributing
We welcome pull requests, improvements, and feature suggestions.  
Fork → Modify → Submit PR ✔️

---

# 📜 License
This project is **free and open-source**.

---

# 🙌 Credits
- OCR by **Tesseract.js**  
- UI powered by **Tailwind CSS**  
- MERN Stack ❤️

---

Enjoy building
