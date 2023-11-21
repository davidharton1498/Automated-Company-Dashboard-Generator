const puppeteer = require('puppeteer');

const getReviews = async (searchTerm, output = "json") => {
    output = output.toLowerCase();
    if (output !== "json" && output !== "object") {
        console.error('INVALID OUTPUT OPTION');
        return;
    }

    console.log('Launching headless chrome...');
    const browser = await puppeteer.launch({ args: ['--disabled-setuid-sandbox', '--no-sandbox'] });
    const page = await browser.newPage();

    console.log('Going to Google Maps and searching for:', searchTerm);
    await page.goto('https://www.google.com/maps');

    // Input the search term in the Google Maps search bar
    //await page.waitForSelector('input#searchboxinput.searchboxinput.xiQnY.nZtQUb');
    //await page.type('input#searchboxinput.searchboxinput.xiQnY.nZtQUb', searchTerm);
    //await page.waitForXPath('(//div[@class=".searchboxinput.xiQnY.nZtQUb"])[1]');
// Așteaptă ca elementul cu id-ul #searchboxinput să fie prezent în pagină
await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.6045.160 Safari/537.36');

//await page.waitForSelector('input#searchboxinput.searchboxinput.xiQnY.nZtQUb');
    //await page.click('div[@class=".searchboxinput.xiQnY.nZtQUb"'),
    //await exportpopup.waitforselector('.clink').catch(error => console.log('failed to wait for the selector'),
 
// Apoi, scrie textul în input
// Așteaptă ca elementul de căutare să fie vizibil
//await page.waitForSelector('input#searchboxinput', { visible: true });

// Tastează termenul de căutare în elementul de căutare
//await page.type('input#searchboxinput', searchTerm);

// Așteaptă un scurt interval pentru a lăsa rezultatele să se încarce
//await page.waitForTimeout(1000); // Puteți ajusta această valoare în funcție de necesități

// Apasă tasta "Enter" pentru a lansa căutarea
//await page.keyboard.press('Enter');

// Apăsă tasta Enter după ce a fost scris textul
//await page.keyboard.press('Enter');

    // Wait for the search results to load
    //await page.waitForSelector('.section-result');

    // Click on the first result (you may need to adjust this based on your use case)
    //await page.click('.section-result');

    // Wait for the details page to load
    //await page.waitForSelector('.section-hero-header-title');

    // Now, you can extract reviews from the details page
    const data = await page.evaluate(() => {
        //let reviewAuthorNamesClasses = document.querySelectorAll('.section-review-title');
        //let reviewAuthorNames = Array.from(reviewAuthorNamesClasses, element => element.innerText.trim());
        const review = [
            {
                "name": "Alexandre MASSON",
                "date": "il y a 5 jours",
                "rating": "5",
                "content": "Magnifique et incontournable monument de la capitale française. A absolument faire lors de votre visite parisienne ! Haute de 321 mètres, cette tour de fer surplombe la région parisienne. Véritable prouesse architecturale et scientifique, …"
            },
            {
                "name": "Caroline Nédélec",
                "date": "il y a 2 semaines",
                "rating": "4",
                "content": "Un lieu toujours magnifique. Attention ne vous faites pas photographier de force par tous ces photographes qui traînent dans la tour et qui veulent vous vendre des photos à prix d'or. Évidemment les prix ne sont pas affichés et le tarif est …"
            },
            {
                "name": "Alexandre MASSON",
                "date": "il y a 5 jours",
                "rating": "5",
                "content": "Magnifique et incontournable monument de la capitale française. A absolument faire lors de votre visite parisienne ! Haute de 321 mètres, cette tour de fer surplombe la région parisienne. Véritable prouesse architecturale et scientifique, …"
            },
        ]

        //let datesClasses = document.querySelectorAll('.section-review-publish-date');
        //let dates = Array.from(datesClasses, element => element.innerText.trim());
        dates = [
            "il y a 5 jours", "il y a 2 semaines", "il y a 2 semaines"
        ]
        //let ratingsClasses = document.querySelectorAll('.section-review-stars[aria-label]');
        //let ratings = Array.from(ratingsClasses, element => parseFloat(element.getAttribute('aria-label').replace(/[^0-9.]/g, '')));
        ratings = [
            5, 5, 5
        ]
        //let reviewsContentClasses = document.querySelectorAll('.section-review-text');
        //let reviewsContent = Array.from(reviewsContentClasses, element => element.innerText.trim());
        reviewsContent = [
            "Magnifique et incontournable monument de la capitale française. A absolument faire lors de votre visite parisienne ! Haute de 321 mètres, cette tour de fer surplombe la région parisienne. Véritable prouesse architecturale et scientifique, …",
            "Un lieu toujours magnifique. Attention ne vous faites pas photographier de force par tous ces photographes qui traînent dans la tour et qui veulent vous vendre des photos à prix d'or. Évidemment les prix ne sont pas affichés et le tarif est …",
            "La dame de fer est l'emblème de notre capitale, le monument à visiter en priorité. \nLa vue depuis le sommet est incontournable !\nL'ascension par les escaliers est une belle expérience et permet de profiter au mieux de la structure, cependant elle est réservée aux plus sportifs. La descente est possible également 😉"
        ]
        return {
            review
        };
    });

    console.log('Done! Closing browser...');
    browser.close();
    console.log(data);

    return new Promise((resolve, reject) => {
        if (output === "json") {
            resolve(JSON.stringify(data));
        } else if (output === "object") {
            resolve(data);
        }
        if (reject) {
            reject({ error: "error while scraping data." });
        }
    });
};

module.exports = getReviews;