const csvUrls = {
  english: [
        'https://docs.google.com/spreadsheets/d/e/2PACX-1vTiSi2gAvTMHzG_qazChse6NPFZDTKEFbJ5OgW1F5xEf5JjobUOEDUgurGZfghaLvbR8YbLgybuwtaK/pub?gid=1102806551&single=true&output=csv',
        'https://docs.google.com/spreadsheets/d/e/2PACX-1vTiSi2gAvTMHzG_qazChse6NPFZDTKEFbJ5OgW1F5xEf5JjobUOEDUgurGZfghaLvbR8YbLgybuwtaK/pub?gid=1646285666&single=true&output=csv',
        'https://docs.google.com/spreadsheets/d/e/2PACX-1vTiSi2gAvTMHzG_qazChse6NPFZDTKEFbJ5OgW1F5xEf5JjobUOEDUgurGZfghaLvbR8YbLgybuwtaK/pub?gid=598018975&single=true&output=csv'
  ],  
  punjabi: [
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vTiSi2gAvTMHzG_qazChse6NPFZDTKEFbJ5OgW1F5xEf5JjobUOEDUgurGZfghaLvbR8YbLgybuwtaK/pub?gid=1674564694&single=true&output=csv',
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vTiSi2gAvTMHzG_qazChse6NPFZDTKEFbJ5OgW1F5xEf5JjobUOEDUgurGZfghaLvbR8YbLgybuwtaK/pub?gid=763432794&single=true&output=csv',
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vTiSi2gAvTMHzG_qazChse6NPFZDTKEFbJ5OgW1F5xEf5JjobUOEDUgurGZfghaLvbR8YbLgybuwtaK/pub?gid=1908107751&single=true&output=csv'
  ]
    
};

async function fetchAndDisplayCSV(url, container) {
  try {
    const response = await fetch(url);
    const csvText = await response.text();

    // Parse CSV data
    const rows = csvText.split('\n').map(row => row.split(','));

    const table = document.createElement('table');

    // Add header row with merged cells
    const headerRow = document.createElement('tr');
    headerRow.className = 'header-row';
    const headerCell = document.createElement('td');
    headerCell.colSpan = 2;
    headerCell.textContent = rows[0][0];
    headerRow.appendChild(headerCell);
    table.appendChild(headerRow);

    // Add the rest of the rows
    rows.slice(1).forEach(row => {
      if (row.length >= 2) {
        const tr = document.createElement('tr');
        const td1 = document.createElement('td');
        const td2 = document.createElement('td');
        td1.textContent = row[0];
        td2.textContent = row[1];
        tr.appendChild(td1);
        tr.appendChild(td2);
        table.appendChild(tr);
      }
    });

    // Append the table to the container
    container.appendChild(table);
  } catch (error) {
    console.error('Error fetching or parsing CSV:', error);
  }
}

// Function to load all tables for a given language
async function loadTables(language) {
  const container = document.getElementById('tables-container');
  container.innerHTML = ''; // Clear existing tables

  for (const url of csvUrls[language]) {
    await fetchAndDisplayCSV(url, container);
  }
}

// Function to switch language and update button styles
function switchLanguage(language) {
  const englishButton = document.getElementById('english-button');
  const punjabiButton = document.getElementById('punjabi-button');

  if (language === 'english') {
    englishButton.classList.add('selected');
    punjabiButton.classList.remove('selected');
  } else {
    punjabiButton.classList.add('selected');
    englishButton.classList.remove('selected');
  }

  loadTables(language);
}

// Load the default English tables on page load
loadTables('english');