/**
 * ============================================================================
 * GOOGLE APPS SCRIPT BACKEND FOR WEDDING INVITATION V2
 * ============================================================================
 * Spreadsheet ID: 1wAe06qhJB6JIFcvSbtLLof7kMU5Ddbxtakj7l7su0e0
 * Worksheets: 'RSVP' & 'Wishes'
 *
 * CARA DEPLOY:
 * 1. Buka Google Sheets: https://docs.google.com/spreadsheets/d/1wAe06qhJB6JIFcvSbtLLof7kMU5Ddbxtakj7l7su0e0
 * 2. Klik Extensions (Ekstensi) > Apps Script.
 * 3. Hapus kode bawaan, lalu paste SELURUH isi file ini.
 * 4. Klik Deploy > New deployment.
 * 5. Pilih Select type > Web app.
 * 6. Execute as: Me (email Anda).
 * 7. Who has access: Anyone (Siapa saja).
 * 8. Klik Deploy, selesaikan otorisasi, lalu salin "Web app URL".
 * ============================================================================
 */

const SPREADSHEET_ID = "1wAe06qhJB6JIFcvSbtLLof7kMU5Ddbxtakj7l7su0e0";

/**
 * Handle HTTP POST requests from React Frontend
 */
function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return createJsonResponse(false, "Payload request tidak ditemukan.");
    }

    // Parse JSON payload (dikirim sebagai text/plain JSON untuk menghindari CORS preflight)
    var data;
    try {
      data = JSON.parse(e.postData.contents);
    } catch (err) {
      return createJsonResponse(false, "Format JSON tidak valid.");
    }

    var type = data.type;
    if (type === "rsvp") {
      return handleRsvp(data);
    } else if (type === "wishes") {
      return handleWishes(data);
    } else {
      return createJsonResponse(false, "Tipe request tidak dikenal.");
    }
  } catch (error) {
    return createJsonResponse(false, "Server error: " + error.toString());
  }
}

/**
 * Handle HTTP GET requests for testing endpoint health
 */
function doGet(e) {
  return createJsonResponse(true, "Google Apps Script Web App Wedding Invitation API is Running.");
}

/**
 * Handle RSVP Form Data Insertion
 */
function handleRsvp(data) {
  var name = sanitizeInput(data.name, 100);
  var status = sanitizeInput(data.status, 20);
  var count = sanitizeInput(data.count, 10);
  var message = sanitizeInput(data.message, 1000);
  var qrCodeId = sanitizeInput(data.qrCodeId || data.qrCode || (status === "Absen" ? "none" : ""), 200);

  if (!name) {
    return createJsonResponse(false, "Nama lengkap wajib diisi.");
  }

  var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  var sheet = ss.getSheetByName("RSVP");
  if (!sheet) {
    sheet = ss.insertSheet("RSVP");
    sheet.appendRow(["Timestamp", "Nama", "Status Kehadiran", "Jumlah Tamu", "Pesan", "QR_Code_ID"]);
    sheet.getRange(1, 1, 1, 6).setFontWeight("bold");
  }

  var timestamp = Utilities.formatDate(new Date(), "Asia/Jakarta", "yyyy-MM-dd HH:mm:ss");
  sheet.appendRow([timestamp, name, status || "Hadir", count || "1", message || "-", qrCodeId || "none"]);

  return createJsonResponse(true, "Data RSVP berhasil disimpan.");
}

/**
 * Handle Wishes Book Data Insertion
 */
function handleWishes(data) {
  var sender = sanitizeInput(data.sender, 100);
  var text = sanitizeInput(data.text, 1000);

  if (!sender || !text) {
    return createJsonResponse(false, "Nama pengirim dan ucapan wajib diisi.");
  }

  var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  var sheet = ss.getSheetByName("Wishes");
  if (!sheet) {
    sheet = ss.insertSheet("Wishes");
    sheet.appendRow(["Timestamp", "Nama Pengirim", "Ucapan"]);
    sheet.getRange(1, 1, 1, 3).setFontWeight("bold");
  }

  var timestamp = Utilities.formatDate(new Date(), "Asia/Jakarta", "yyyy-MM-dd HH:mm:ss");
  sheet.appendRow([timestamp, sender, text]);

  return createJsonResponse(true, "Data ucapan berhasil disimpan.");
}

/**
 * Sanitasi & Validasi Input Teks
 */
function sanitizeInput(str, maxLength) {
  if (typeof str !== "string") {
    str = str ? String(str) : "";
  }
  // Strip HTML tags & trim spaces
  str = str.replace(/<[^>]*>?/gm, "").trim();
  if (maxLength && str.length > maxLength) {
    str = str.substring(0, maxLength);
  }
  return str;
}

/**
 * Helper untuk mengembalikan Response JSON
 */
function createJsonResponse(success, message) {
  var output = JSON.stringify({
    success: success,
    message: message,
    timestamp: new Date().toISOString()
  });
  return ContentService.createTextOutput(output).setMimeType(ContentService.MimeType.JSON);
}
