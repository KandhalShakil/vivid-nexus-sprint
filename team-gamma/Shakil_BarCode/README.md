<div align="center">
  <img src="https://via.placeholder.com/1000x300/0B0F19/3B82F6?text=ScanFusion+-+Professional+Barcode+Platform" alt="ScanFusion Banner" />
</div>

<h1 align="center">
  <img src="https://readme-typing-svg.herokuapp.com?font=Poppins&weight=600&size=40&duration=3000&pause=1000&color=3B82F6&center=true&vCenter=true&lines=ScanFusion;Professional+Barcode+Scanner;Generate+in+Milliseconds;100%25+In-Memory+Processing" alt="Typing SVG" />
</h1>

<div align="center">
  
  [![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge&logo=appveyor)](https://opensource.org/licenses/MIT)
  [![Python](https://img.shields.io/badge/Python-3.9+-blue?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)
  [![Flask](https://img.shields.io/badge/Flask-3.0-black?style=for-the-badge&logo=flask&logoColor=white)](https://flask.palletsprojects.com/)
  [![OpenCV](https://img.shields.io/badge/OpenCV-4.8-green?style=for-the-badge&logo=opencv&logoColor=white)](https://opencv.org/)
  [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=for-the-badge)](http://makeapullrequest.com)

  <p align="center">
    <strong>A high-performance, 100% in-memory barcode generation and scanning platform built with a premium glassmorphic UI.</strong>
  </p>
</div>

<hr/>

## ✨ Key Features

- 🚀 **100% In-Memory Processing:** Zero disk footprint! All image generation and decoding happens in RAM for lightning-fast performance and ultimate security.
- 🎨 **Premium Dark Mode UI:** Hand-crafted, responsive interface featuring deep glassmorphism, neon ambient glows, and smooth scroll-reveal animations.
- 📷 **Live Webcam Scanning:** Point your device's camera to instantly scan barcodes securely from the browser.
- 🖼️ **Image Upload Scanning:** Drag & Drop support for uploading PNG/JPG files to extract barcode data via OpenCV & PyZbar.
- 🏭 **Multi-Format Generation:** Create standard `Code128`, `EAN-13`, and `Code39` barcodes effortlessly.
- 📥 **SVG & PNG Downloads:** Export generated barcodes in high-quality vector or raster formats.
- 📱 **Fully Responsive:** Flawless experience across desktop, tablet, and mobile devices.

## 🛠️ Technology Stack

| Category | Technology | Description |
| :--- | :--- | :--- |
| **Frontend** | HTML5, CSS3, Vanilla JS | No framework overhead. IntersectionObservers for animations. |
| **Backend** | Python 3, Flask | Lightweight routing and API management. |
| **Generator** | `python-barcode` | Generates SVG/PNG structures natively. |
| **Scanner** | `OpenCV`, `pyzbar` | Decodes raw byte buffers in memory. |
| **UI Design** | FontAwesome, Google Fonts | Premium typography (Poppins) and scalable icons. |

## 🏗️ Project Architecture & Workflow

ScanFusion is built on a clean, minimal architecture. The application is a Single Page Application (SPA) where the frontend asynchronously communicates with a stateless Flask backend.

<details>
<summary><b>View Application Workflow</b></summary>
<br>

1. **Generation Flow:** User requests a barcode -> Frontend sends JSON payload -> Flask `core/generator.py` writes barcode to `io.BytesIO()` -> Encoded to Base64 -> Returned directly to frontend UI.
2. **Scanning Flow:** User uploads image or captures camera frame -> Frontend sends Blob -> Flask `core/scanner.py` decodes raw bytes into numpy array -> PyZbar extracts data -> JSON returned to frontend.
</details>

### 📂 Folder Structure

```text
📦 Shakil_BarCode
 ┣ 📂 core/                # Core business logic
 ┃ ┣ 📜 generator.py       # In-memory barcode generation
 ┃ ┗ 📜 scanner.py         # In-memory OpenCV/PyZbar decoding
 ┣ 📂 static/              # Frontend assets
 ┃ ┣ 📂 css/
 ┃ ┃ ┗ 📜 style.css        # Premium dark mode styles
 ┃ ┗ 📂 js/
 ┃   ┗ 📜 script.js        # DOM manipulation, camera, API logic
 ┣ 📂 templates/           # Flask views
 ┃ ┗ 📜 index.html         # Main SPA interface
 ┣ 📜 app.py               # Flask application and routing
 ┣ 📜 requirements.txt     # Python dependencies
 ┗ 📜 README.md            # Project documentation
```

## 🚀 Installation & Setup

Get ScanFusion running locally in seconds.

### Prerequisites
- Python 3.9 or higher
- (Windows) Microsoft Visual C++ Redistributable (Required for PyZbar/OpenCV)

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/ScanFusion.git
   cd ScanFusion
   ```

2. **Create a virtual environment**
   ```bash
   python -m venv venv
   
   # Windows
   .\venv\Scripts\activate
   # macOS/Linux
   source venv/bin/activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Run the application**
   ```bash
   python app.py
   ```

5. **Open your browser**
   Navigate to `http://localhost:5000`

## 📸 Screenshots

<details>
<summary><b>Click to view UI Previews</b></summary>
<br>
<div align="center">
  <img src="https://via.placeholder.com/800x450/111827/3B82F6?text=Dark+Mode+Hero+Section" alt="Hero Section"/>
  <br><br>
  <img src="https://via.placeholder.com/800x450/111827/8B5CF6?text=Live+Webcam+Scanner" alt="Scanner"/>
  <br><br>
  <img src="https://via.placeholder.com/800x450/111827/10B981?text=Barcode+Generation" alt="Generator"/>
</div>
</details>

## 🔌 API Endpoints

| Method | Endpoint | Description | Payload | Response |
| :--- | :--- | :--- | :--- | :--- |
| `GET` | `/` | Serves the main SPA interface. | - | HTML |
| `POST` | `/generate` | Generates a barcode. | `{"text": "123", "type": "code128"}` | Base64 PNG & SVG |
| `POST` | `/scan` | Scans a barcode from an image. | Form-Data: `image` file | Extracted string & type |

## 🔮 Future Enhancements

- [ ] Add support for **QR Code** generation and scanning.
- [ ] Implement a **Batch Generation** feature via CSV upload.
- [ ] PWA (Progressive Web App) support for offline usage.
- [ ] Export scanned history as an Excel file.