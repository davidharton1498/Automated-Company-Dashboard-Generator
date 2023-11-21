document.getElementById('companyForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const companyName = document.getElementById('companyName').value;
    const commercial_names = [companyName];
    const address_txt = document.getElementById('address_txt').value;
    // Call backend API for data enrichment and report generation
    axios.post('/generate-dashboard', { commercial_names, address_txt })
        .then(response => {
            console.log(response.data);
            // Assuming the response.data has a property named num_locations
            //const numLocationsElement = document.getElementById('numLocations');
            //numLocationsElement.textContent = response.data.num_locations;
            //window.location.href = 'index.html';
            displayDashboard(response.data);     

        })
        .catch(error => {
            if (error.response && error.response.status === 400) {
                console.error('Bad Request:', error.response.data.message);
            } else {
                console.error('Error:', error.message);
            }
            // Handle error display or logging
        });
        
});

function displayDashboard(data) {

  const naceTable = document.getElementById('naceTable');
  if (!naceTable) {
      console.error("Element with id 'naceTable' not found.");
      return;
    }
  const naceTableBody = document.getElementById('naceTable').getElementsByTagName('tbody')[0];

  // Clear existing rows
  naceTableBody.innerHTML = '';

  if (data.nace_rev2 && Array.isArray(data.nace_rev2)) {
      data.nace_rev2.forEach(item => {
        // Add a new row with data
        const newRow = naceTableBody.insertRow();
        newRow.insertCell(0).innerText = item.code || '-';
        newRow.insertCell(1).innerText = item.label || '-';
      });
    } else {
      console.error('Unexpected data structure. Check the response from the server.');
    }

    const naics_2022 = document.getElementById('naics_2022');
  if (!naics_2022) {
      console.error("Element with id 'naics_2022' not found.");
      return;
    }  
  const tableBody = document.getElementById('naics_2022').getElementsByTagName('tbody')[0];

  // Clear existing rows
  tableBody.innerHTML = '';

  // Check if 'primary' property exists
  // Check if 'naics_2022' property exists
  if (data.naics_2022) {
      const primaryData = data.naics_2022.primary;
  
      // Check if 'primary' property exists
      if (primaryData) {
        // Add a new row with data
        const newRow = tableBody.insertRow();
        newRow.insertCell(0).innerText = primaryData.code || ''; // Use default value if 'code' is undefined
        newRow.insertCell(1).innerText = primaryData.label || ''; // Use default value if 'label' is undefined
        newRow.insertCell(2).innerText = data.naics_2022.secondary && data.naics_2022.secondary.code ? data.naics_2022.secondary.code : '-';
        newRow.insertCell(3).innerText = data.naics_2022.secondary && data.naics_2022.secondary.label ? data.naics_2022.secondary.label : '-';
      } else {
        console.error('Unexpected data structure. Check the response from the server.');
      }
    } else {
      console.error('Unexpected data structure. Check the response from the server.');
    }

    const isic_v4Table = document.getElementById('isic_v4Table');
    if (!isic_v4Table) {
        console.error("Element with id 'isic_v4Table' not found.");
        return;
      }
    const isic_v4TableBody = document.getElementById('isic_v4Table').getElementsByTagName('tbody')[0];

    // Clear existing rows
    isic_v4TableBody.innerHTML = '';
  
    if (data.isic_v4 && Array.isArray(data.isic_v4)) {
        data.isic_v4.forEach(item => {
          // Add a new row with data
          const newRow = isic_v4TableBody.insertRow();
          newRow.insertCell(0).innerText = item.code || '-';
          newRow.insertCell(1).innerText = item.label || '-';
        });
      } else {
        console.error('Unexpected data structure. Check the response from the server.');
      }

      const sicTable = document.getElementById('sicTable');
      if (!sicTable) {
          console.error("Element with id 'sicTable' not found.");
          return;
        }
      const sicTableBody = document.getElementById('sicTable').getElementsByTagName('tbody')[0];
  
      // Clear existing rows
      sicTableBody.innerHTML = '';
    
      if (data.sic && Array.isArray(data.sic)) {
          data.sic.forEach(item => {
            // Add a new row with data
            const newRow = sicTableBody.insertRow();
            newRow.insertCell(0).innerText = item.code || '-';
            newRow.insertCell(1).innerText = item.label || '-';
          });
        } else {
          console.error('Unexpected data structure. Check the response from the server.');
        }

        const sics_industry = document.getElementById('sics_industry');
        if (!sics_industry) {
            console.error("Element with id 'sics_industry' not found.");
            return;
          }
        const sics_industryTableBody = document.getElementById('sics_industry').getElementsByTagName('tbody')[0];
    
        // Clear existing rows
        sics_industryTableBody.innerHTML = '';
      
        if(data.sics_industry){
              // Add a new row with data
              const newRow = sics_industryTableBody.insertRow();
              newRow.insertCell(0).innerText = data.sics_industry.code || '-';
              newRow.insertCell(1).innerText = data.sics_industry.label || '-';
        } 

        const sics_sector = document.getElementById('sics_sector');
        if (!sics_sector) {
            console.error("Element with id 'sics_sector' not found.");
            return;
          }
        const sics_sectorTableBody = document.getElementById('sics_sector').getElementsByTagName('tbody')[0];
    
        // Clear existing rows
        sics_sectorTableBody.innerHTML = '';
      
        if(data.sics_sector){
              // Add a new row with data
              const newRow = sics_sectorTableBody.insertRow();
              newRow.insertCell(0).innerText = data.sics_sector.code || '-';
              newRow.insertCell(1).innerText = data.sics_sector.label || '-';
        }
        const sics_subsector = document.getElementById('sics_subsector');
        if (!sics_subsector) {
            console.error("Element with id 'sics_subsector' not found.");
            return;
          }
        const sics_subsectorTableBody = document.getElementById('sics_subsector').getElementsByTagName('tbody')[0];
    
        // Clear existing rows
        sics_subsectorTableBody.innerHTML = '';
      
        if(data.sics_subsector){
              // Add a new row with data
              const newRow = sics_subsectorTableBody.insertRow();
              newRow.insertCell(0).innerText = data.sics_subsector.code || '-';
              newRow.insertCell(1).innerText = data.sics_subsector.label || '-';
        }
        const additional_match_details = document.getElementById('additional_match_details');
        if (!additional_match_details) {
            console.error("Element with id 'additional_match_details' not found.");
            return;
          }
        const additional_match_detailsTableBody = document.getElementById('additional_match_details').getElementsByTagName('tbody')[0];
    
        // Clear existing rows
        additional_match_detailsTableBody.innerHTML = '';
      
        if(data.additional_match_details){
              // Add a new row with data
              const newRow = additional_match_detailsTableBody.insertRow();
             
              newRow.insertCell(0).innerText = data.additional_match_details.location.country_code || '-';
              newRow.insertCell(1).innerText = data.additional_match_details.location.country || '-';
              newRow.insertCell(2).innerText = data.additional_match_details.location.region || '-';
              newRow.insertCell(3).innerText = data.additional_match_details.location.city || '-';
              newRow.insertCell(4).innerText = data.additional_match_details.location.postcode || '-';
              newRow.insertCell(5).innerText = data.additional_match_details.location.street || '-';
              newRow.insertCell(6).innerText = data.additional_match_details.location.street_number || '-';
              newRow.insertCell(7).innerText = data.additional_match_details.location.latitude || '-';
              newRow.insertCell(8).innerText = data.additional_match_details.location.longitude || '-';       
        }

        const ibc_insurance = document.getElementById('ibc_insurance');
        if (!ibc_insurance) {
            console.error("Element with id 'ibc_insurance' not found.");
            return;
          }
        const ibc_insuranceTableBody = document.getElementById('ibc_insurance').getElementsByTagName('tbody')[0];
    
        // Clear existing rows
        ibc_insuranceTableBody.innerHTML = '';
      
        if (data.ibc_insurance && Array.isArray(data.ibc_insurance)) {
            data.ibc_insurance.forEach(item => {
              // Add a new row with data
              const newRow = ibc_insuranceTableBody.insertRow();
              newRow.insertCell(0).innerText = item.code || '-';
              newRow.insertCell(1).innerText = item.label || '-';
            });
          } else {
            console.error('Unexpected data structure. Check the response from the server.');
          }


        const locationsTable = document.getElementById('locationsTable');
        if (!locationsTable) {
            console.error("Element with id 'locationsTable' not found.");
            return;
          }
        const locationsTableBody = document.getElementById('locationsTable').getElementsByTagName('tbody')[0];
    
        // Clear existing rows
        locationsTableBody.innerHTML = '';
      
        if (data.locations && Array.isArray(data.locations)) {
            data.locations.forEach(item => {
              // Add a new row with data
              const newRow = locationsTableBody.insertRow();
              newRow.insertCell(0).innerText = item.country_code || '-';
              newRow.insertCell(1).innerText = item.country || '-';
              newRow.insertCell(2).innerText = item.region || '-';
              newRow.insertCell(3).innerText = item.city || '-';
              newRow.insertCell(4).innerText = item.postcode || '-';
              newRow.insertCell(5).innerText = item.street || '-';
              newRow.insertCell(6).innerText = item.street_number || '-';
              newRow.insertCell(7).innerText = item.latitude || '-';
              newRow.insertCell(8).innerText = item.longitude || '-';
            });
          } else {
            console.error('Unexpected data structure. Check the response from the server.');
          }
          const reviewsTable = document.getElementById('reviewsTable');
          if (!reviewsTable) {
              console.error("Element with id 'reviewsTable' not found.");
              return;
            }
          const reviewsTableBody = document.getElementById('reviewsTable').getElementsByTagName('tbody')[0];
      
          // Clear existing rows
          reviewsTableBody.innerHTML = '';
        
        
                // Add a new row with data
                const newRow = reviewsTableBody.insertRow();
                newRow.insertCell(0).innerText = "Alexandre MASSON";
                newRow.insertCell(1).innerText = "il y a 5 jours";
                newRow.insertCell(2).innerText = "5";
                newRow.insertCell(3).innerText = "Magnifique et incontournable monument de la capitale française. A absolument faire lors de votre visite parisienne ! Haute de 321 mètres, cette tour de fer surplombe la région parisienne. Véritable prouesse architecturale et scientifique, …";
                const newRow2 = reviewsTableBody.insertRow();
                newRow2.insertCell(0).innerText = "Caroline Nédélec";
                newRow2.insertCell(1).innerText = "il y a 2 semaines";
                newRow2.insertCell(2).innerText = "4";
                newRow2.insertCell(3).innerText = "Un lieu toujours magnifique. Attention ne vous faites pas photographier de force par tous ces photographes qui traînent dans la tour et qui veulent vous vendre des photos à prix d'or. Évidemment les prix ne sont pas affichés et le tarif est …";
                const newRow3 = reviewsTableBody.insertRow();
                newRow3.insertCell(0).innerText = "Caroline Nédélec";
                newRow3.insertCell(1).innerText = "il y a 2 semaines";
                newRow3.insertCell(2).innerText = "4";
                newRow3.insertCell(3).innerText = "Un lieu toujours magnifique. Attention ne vous faites pas photographier de force par tous ces photographes qui traînent dans la tour et qui veulent vous vendre des photos à prix d'or. Évidemment les prix ne sont pas affichés et le tarif est …";
              
            
    const soleadifyIdElement = document.getElementById('soleadifyId');
    soleadifyIdElement.textContent = `${data.soleadify_id}`;

    const match_score = document.getElementById('match_score');
    match_score.textContent = `${data.match_score}`;

    const match_method = document.getElementById('match_method');
    match_method.textContent = `${data.match_method}`;

    const company_name = document.getElementById('company_name');
    company_name.textContent = `${data.company_name}`;

    const company_legal_names = document.getElementById('company_legal_names');
    company_legal_names.textContent = `${data.company_legal_names}`;
    
    const company_commercial_names = document.getElementById('company_commercial_names');
    company_commercial_names.textContent = `${data.company_commercial_names}`;

    const main_country_code = document.getElementById('main_country_code');
    main_country_code.textContent = `${data.main_country_code}`;

    const main_country = document.getElementById('main_country');
    main_country.textContent = `${data.main_country}`;

    const main_region = document.getElementById('main_region');
    main_region.textContent = `${data.main_region}`;

    const main_city = document.getElementById('main_city');
    main_city.textContent = `${data.main_city}`;

    const main_street = document.getElementById('main_street');
    main_street.textContent = `${data.main_street}`;

    const main_street_number = document.getElementById('main_street_number');
    main_street_number.textContent = `${data.main_street_number}`;

    const main_postcode = document.getElementById('main_postcode');
    main_postcode.textContent = `${data.main_postcode}`;

    const main_latitude = document.getElementById('main_latitude');
    main_latitude.textContent = `${data.main_latitude}`;

    const main_longitude = document.getElementById('main_longitude');
    main_longitude.textContent = `${data.main_longitude}`;
    
    const num_locations = document.getElementById('num_locations');
    num_locations.textContent = `${data.num_locations}`;

    const num_locationss = document.getElementById('num_locationss');
    num_locationss.textContent = `${data.num_locations}`;

    const company_type = document.getElementById('company_type');
    company_type.textContent = `${data.company_type}`;

    const year_founded = document.getElementById('year_founded');
    year_founded.textContent = `${data.year_founded}`;

    const employee_count = document.getElementById('employee_count');
    employee_count.textContent = `${data.employee_count}`;

    const estimated_revenue = document.getElementById('estimated_revenue');
    estimated_revenue.textContent = `${data.estimated_revenue}`;

    const short_description = document.getElementById('short_description');
    short_description.textContent = `${data.short_description}`;

    const long_description = document.getElementById('long_description');
    long_description.textContent = `${data.long_description}`;

    const business_tags = document.getElementById('business_tags');
    business_tags.textContent = `${data.business_tags}`;

    const main_business_category = document.getElementById('main_business_category');
    main_business_category.textContent = `${data.main_business_category}`;

    const main_industry = document.getElementById('main_industry');
    main_industry.textContent = `${data.main_industry}`;

    const main_sector = document.getElementById('main_sector');
    main_sector.textContent = `${data.main_sector}`;

    const primary_phone = document.getElementById('primary_phone');
    primary_phone.textContent = `${data.primary_phone}`;

    const phone_numbers = document.getElementById('phone_numbers');
    phone_numbers.textContent = `${data.phone_numbers}`;

    const primary_email = document.getElementById('primary_email');
    primary_email.textContent = `${data.primary_email}`;

    const emails = document.getElementById('emails');
    emails.textContent = `${data.emails}`;

    const other_emails = document.getElementById('other_emails');
    other_emails.textContent = `${data.other_emails}`;

    const website_url = document.getElementById('website_url');
    website_url.textContent = `${data.website_url}`;

    const website_domain = document.getElementById('website_domain');
    website_domain.textContent = `${data.website_domain}`;

    const website_tld = document.getElementById('website_tld');
    website_tld.textContent = `${data.website_tld}`;

    const website_language_code = document.getElementById('website_language_code');
    website_language_code.textContent = `${data.website_language_code}`;

    const facebook_url = document.getElementById('facebook_url');
    facebook_url.textContent = `${data.facebook_url}`;

    const twitter_url = document.getElementById('twitter_url');
    twitter_url.textContent = `${data.twitter_url}`;

    const instagram_url = document.getElementById('instagram_url');
    instagram_url.textContent = `${data.instagram_url}`;

    const linkedin_url = document.getElementById('linkedin_url');
    linkedin_url.textContent = `${data.linkedin_url}`;

    const ios_app_url = document.getElementById('ios_app_url');
    ios_app_url.textContent = `${data.ios_app_url}`;

    const technologies = document.getElementById('technologies');
    technologies.textContent = `${data.technologies}`;

    const ncci_codes_28_1 = document.getElementById('ncci_codes_28_1');
    ncci_codes_28_1.textContent = `${data.ncci_codes_28_1}`;

    const dashboardContainer = document.getElementById('dashboardContainer');
    dashboardContainer.innerHTML = '';

    
    // Build and append your dashboard elements based on the data
    // Example: dashboardContainer.innerHTML = '<div>Your Dashboard Content</div>';
}
