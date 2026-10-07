export interface ApprenticeRegistrationRecord {
  fullName: string;
  documentType: string;
  documentNumber: string;
  programName: string;
  fichaNumber: string;
  regional: string;
  trainingCenter: string;
  examScore: number | null;
  certifiedAt: string | null;
  verificationCode?: string;
  registeredByEmail?: string;
  // Gamified metrics
  correctCount?: number;
  totalQuestions?: number;
  gamifiedScore?: number;
  timeSpentFormatted?: string;
  maxStreak?: number;
}

export interface SheetLearnerRow {
  rowIndex: number;
  fecha: string;
  nombre: string;
  tipoDoc: string;
  numDoc: string;
  programa: string;
  ficha: string;
  regional: string;
  centro: string;
  puntaje: string;
  aciertos?: string;
  puntosGamificados?: string;
  tiempoEmpleado?: string;
  rachaMaxima?: string;
  estado: string;
  codigoVerificacion: string;
  registradoPor: string;
}

const STORAGE_SPREADSHEET_KEY = 'sena_induction_google_sheet_id';

export const getSavedSpreadsheetId = (): string | null => {
  return localStorage.getItem(STORAGE_SPREADSHEET_KEY);
};

export const setSavedSpreadsheetId = (id: string | null) => {
  if (id) {
    localStorage.setItem(STORAGE_SPREADSHEET_KEY, id);
  } else {
    localStorage.removeItem(STORAGE_SPREADSHEET_KEY);
  }
};

/**
 * Creates a brand new institutional induction spreadsheet in user's Google Drive
 */
export const createInductionSpreadsheet = async (
  accessToken: string,
  title: string = 'Registro de Inducción SENA - Aprendices'
): Promise<{ spreadsheetId: string; spreadsheetUrl: string; sheetName: string }> => {
  const sheetName = 'Aprendices';

  const body = {
    properties: {
      title
    },
    sheets: [
      {
        properties: {
          title: sheetName,
          gridProperties: {
            frozenRowCount: 1
          }
        },
        data: [
          {
            startRow: 0,
            startColumn: 0,
            rowData: [
              {
                values: [
                  { userEnteredValue: { stringValue: 'Fecha y Hora' } },
                  { userEnteredValue: { stringValue: 'Nombre Completo' } },
                  { userEnteredValue: { stringValue: 'Tipo Doc' } },
                  { userEnteredValue: { stringValue: 'Número Documento' } },
                  { userEnteredValue: { stringValue: 'Programa de Formación' } },
                  { userEnteredValue: { stringValue: 'Ficha' } },
                  { userEnteredValue: { stringValue: 'Regional' } },
                  { userEnteredValue: { stringValue: 'Centro de Formación' } },
                  { userEnteredValue: { stringValue: 'Puntaje (%)' } },
                  { userEnteredValue: { stringValue: 'Aciertos' } },
                  { userEnteredValue: { stringValue: 'Puntos Ranking' } },
                  { userEnteredValue: { stringValue: 'Tiempo Empleado' } },
                  { userEnteredValue: { stringValue: 'Racha Máxima' } },
                  { userEnteredValue: { stringValue: 'Estado Inducción' } },
                  { userEnteredValue: { stringValue: 'Código Certificado' } },
                  { userEnteredValue: { stringValue: 'Correo Registrador' } }
                ]
              }
            ]
          }
        ]
      }
    ]
  };

  const response = await fetch('https://sheets.googleapis.com/v4/spreadsheets', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error?.message || `Error al crear la hoja de cálculo (${response.status})`);
  }

  const data = await response.json();
  const spreadsheetId = data.spreadsheetId;
  const spreadsheetUrl = data.spreadsheetUrl || `https://docs.google.com/spreadsheets/d/${spreadsheetId}/edit`;

  // Apply styling to header (SENA green background #39A900, white bold text)
  try {
    const sheetId = data.sheets?.[0]?.properties?.sheetId || 0;
    await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}:batchUpdate`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        requests: [
          {
            repeatCell: {
              range: {
                sheetId,
                startRowIndex: 0,
                endRowIndex: 1,
                startColumnIndex: 0,
                endColumnIndex: 16
              },
              cell: {
                userEnteredFormat: {
                  backgroundColor: {
                    red: 57 / 255,
                    green: 169 / 255,
                    blue: 0 / 255
                  },
                  textFormat: {
                    bold: true,
                    foregroundColor: {
                      red: 1,
                      green: 1,
                      blue: 1
                    },
                    fontSize: 10
                  },
                  horizontalAlignment: 'CENTER'
                }
              },
              fields: 'userEnteredFormat(backgroundColor,textFormat,horizontalAlignment)'
            }
          },
          {
            autoResizeDimensions: {
              dimensions: {
                sheetId,
                dimension: 'COLUMNS',
                startIndex: 0,
                endIndex: 16
              }
            }
          }
        ]
      })
    });
  } catch (styleErr) {
    console.warn('Could not apply header styling to sheet, but sheet was created:', styleErr);
  }

  setSavedSpreadsheetId(spreadsheetId);
  return { spreadsheetId, spreadsheetUrl, sheetName };
};

/**
 * Checks if a spreadsheet exists and gets its metadata
 */
export const checkSpreadsheetExists = async (
  accessToken: string,
  spreadsheetId: string
): Promise<{ title: string; sheetName: string; url: string } | null> => {
  try {
    const res = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}?fields=spreadsheetId,properties.title,sheets.properties.title`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    );

    if (!res.ok) return null;
    const data = await res.json();
    const sheetName = data.sheets?.[0]?.properties?.title || 'Aprendices';
    return {
      title: data.properties?.title || 'Registro de Inducción SENA',
      sheetName,
      url: `https://docs.google.com/spreadsheets/d/${spreadsheetId}/edit`
    };
  } catch {
    return null;
  }
};

/**
 * Finds or creates the Induction Spreadsheet in Google Drive
 */
export const getOrCreateInductionSpreadsheet = async (
  accessToken: string
): Promise<{ spreadsheetId: string; spreadsheetUrl: string; sheetName: string }> => {
  // 1. Check cached ID
  const savedId = getSavedSpreadsheetId();
  if (savedId) {
    const info = await checkSpreadsheetExists(accessToken, savedId);
    if (info) {
      return {
        spreadsheetId: savedId,
        spreadsheetUrl: info.url,
        sheetName: info.sheetName
      };
    }
  }

  // 2. Search Drive for existing file created by this app
  try {
    const query = encodeURIComponent("name = 'Registro de Inducción SENA - Aprendices' and trashed = false");
    const driveRes = await fetch(
      `https://www.googleapis.com/drive/v3/files?q=${query}&fields=files(id,name,webViewLink)&pageSize=1`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    );

    if (driveRes.ok) {
      const driveData = await driveRes.json();
      if (driveData.files && driveData.files.length > 0) {
        const file = driveData.files[0];
        const info = await checkSpreadsheetExists(accessToken, file.id);
        if (info) {
          setSavedSpreadsheetId(file.id);
          return {
            spreadsheetId: file.id,
            spreadsheetUrl: file.webViewLink || info.url,
            sheetName: info.sheetName
          };
        }
      }
    }
  } catch (err) {
    console.warn('Could not search Drive for existing sheet:', err);
  }

  // 3. Create fresh spreadsheet
  return await createInductionSpreadsheet(accessToken);
};

/**
 * Appends a learner record to the spreadsheet with full gamified metrics
 */
export const appendApprenticeRecord = async (
  accessToken: string,
  spreadsheetId: string,
  record: ApprenticeRegistrationRecord,
  sheetName: string = 'Aprendices'
): Promise<{ updatedRows: number; range: string }> => {
  const now = new Date();
  const formattedDate = now.toLocaleString('es-CO', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  const rowValues = [
    formattedDate,
    record.fullName,
    record.documentType,
    record.documentNumber,
    record.programName,
    record.fichaNumber,
    record.regional,
    record.trainingCenter,
    record.examScore !== null ? `${record.examScore}%` : 'Completado',
    record.correctCount !== undefined ? `${record.correctCount} / ${record.totalQuestions || 25}` : '',
    record.gamifiedScore !== undefined ? `${record.gamifiedScore.toLocaleString()} pts` : '',
    record.timeSpentFormatted || '',
    record.maxStreak !== undefined ? `${record.maxStreak}x` : '',
    record.examScore && record.examScore >= 80 ? 'APROBADO' : 'PARTICIPANTE',
    record.verificationCode || `SENA-${record.fichaNumber}-${record.documentNumber.slice(-4)}`,
    record.registeredByEmail || 'Usuario autenticado'
  ];

  // Try appending to specified sheet name
  let range = `${encodeURIComponent(sheetName)}!A:P`;
  let res = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}:append?valueInputOption=USER_ENTERED`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        values: [rowValues]
      })
    }
  );

  // Fallback to Sheet1 if sheet name not found
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    if (res.status === 400 || errorData.error?.message?.includes('Unable to parse range')) {
      range = `Sheet1!A:P`;
      res = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}:append?valueInputOption=USER_ENTERED`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            values: [rowValues]
          })
        }
      );
    }
  }

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error?.message || `Error al registrar aprendiz en Google Sheets (${res.status})`);
  }

  const result = await res.json();
  return {
    updatedRows: result.updates?.updatedRows || 1,
    range: result.updates?.updatedRange || range
  };
};

/**
 * Fetches existing apprentice rows from the spreadsheet
 */
export const fetchApprenticeRecords = async (
  accessToken: string,
  spreadsheetId: string,
  sheetName: string = 'Aprendices'
): Promise<SheetLearnerRow[]> => {
  let range = `${encodeURIComponent(sheetName)}!A2:P`;
  let res = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }
  );

  if (!res.ok) {
    // Fallback to Sheet1
    range = `Sheet1!A2:P`;
    res = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    );
  }

  if (!res.ok) {
    return [];
  }

  const data = await res.json();
  const values: string[][] = data.values || [];

  return values.map((row, index) => {
    // If the sheet has 16 columns (new gamified format)
    const isNewFormat = row.length >= 14;

    return {
      rowIndex: index + 2,
      fecha: row[0] || '',
      nombre: row[1] || '',
      tipoDoc: row[2] || '',
      numDoc: row[3] || '',
      programa: row[4] || '',
      ficha: row[5] || '',
      regional: row[6] || '',
      centro: row[7] || '',
      puntaje: row[8] || '',
      aciertos: isNewFormat ? row[9] || '' : undefined,
      puntosGamificados: isNewFormat ? row[10] || '' : undefined,
      tiempoEmpleado: isNewFormat ? row[11] || '' : undefined,
      rachaMaxima: isNewFormat ? row[12] || '' : undefined,
      estado: isNewFormat ? row[13] || '' : row[9] || '',
      codigoVerificacion: isNewFormat ? row[14] || '' : row[10] || '',
      registradoPor: isNewFormat ? row[15] || '' : row[11] || ''
    };
  });
};
