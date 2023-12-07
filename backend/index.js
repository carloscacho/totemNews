const puppeteer = require("puppeteer")
const express = require("express")
const path = require("path")
const cors = require("cors")

const app = express();

app.use('/static', express.static(path.join(__dirname, 'public')))
app.use(cors());
app.use(express.json());

app.get("/loadnews", async(req, res) =>{
  const ID = (new Date().getTime().toString(36))
  const loc = './public/news/' + ID + ".json"

  const browser  = await puppeteer.launch({
    defaultViewport: {
      width: 1920,
      height: 1080
    },
    ignoreDefaultArgs: ['--disable-extensions']
  });
  const page = await browser.newPage();
  await page.goto("http://www.ifms.edu.br/noticias/2023/ifms-firma-acordo-para-ter-emissora-de-radio-educativa")

  // pegar infos da pagina
  await page.waitForSelector('.documentFirstHeading')
  let element = await page.$('.documentFirstHeading')
  let valueTitulo = await page.evaluate(el => el.textContent, element)

    // pegar infos da pagina
    // await page.waitForSelector('#articleBody > img')
    // let element2 = await page.$('#articleBody > img')
    // let valueImg = await page.evaluate(el => el.src, element2)
  const imgs = await page.$$eval('#rslides1_s0 > img[src]', imgs => imgs.map(img => img.getAttribute('src')));
  
  const noticia = {
    id: 0,
    titulo: valueTitulo,
    img: imgs
  }

  console.log(noticia)

  browser.close()

  res.json({
    success: true,
    noticia
  })

})

app.listen(5000, () => {
  console.log("Serve start");
})
