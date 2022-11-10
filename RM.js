let axions = require('axios')
let cheerio = require('cheerio')
let fs = require('fs')


axions.get('https://rm.id/kategori-berita/parlemen').then((respone) => {
    if(respone.status === 200){
        const html = respone.data;
            const $ = cheerio.load(html);
            let rmList = [];
            $('#mainContent div').each(function(i,elem) {
                rmList[i] ={
                    
                    
                    content :$(this).find('h5','.card-title').text ().trim(),                              
                    url : $(this).find('a').attr('href'),
                    waktuPublis : $(this).find('.card-text').text().trim().replace()
                    
                }
                
            });
            const rmListTrim = rmList.filter(n => n != undefined)
            fs.writeFile('data/RM.json',
                JSON.stringify(rmListTrim, null, 4), (err) => {
                    console.log('write scraping is success')
                })
    }
}), (error) => console.log(err);