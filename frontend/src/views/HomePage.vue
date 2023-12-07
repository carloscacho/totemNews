<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Blank</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Blank</ion-title>
        </ion-toolbar>
      </ion-header>

      <div id="container">
        <strong>Testando App?</strong>

      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/vue';
import puppeteer from 'puppeteer';

const getNewsPage = async () => {

  // Launch the browser
  const browser = await puppeteer.launch();

  // Create a page
  const page = await browser.newPage();

  // Go to your site
  await page.goto('http://www.ifms.edu.br/noticias/2023/ifms-firma-acordo-para-ter-emissora-de-radio-educativa');

  // Query for an element handle.
  const element = await page.waitForSelector('div > .documentFirstHeading');

  console.log(element.value)
  // Do something with element...
  // await element.click(); // Just an example.

  // // Dispose of handle
  // await element.dispose();

  // Close browser.
  await browser.close();


}

</script>

<style scoped>
#container {
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;
  color: #8c8c8c;
  margin: 0;
}

#container a {
  text-decoration: none;
}
</style>
