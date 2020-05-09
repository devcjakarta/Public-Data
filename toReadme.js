const fs = require('fs');
const path = require('path');

const main = async () => {
  try {
    const dataAsString = await fs.readFileSync(path.resolve(`./events.json`), { encoding: 'utf-8' });
    const dataAsJson = JSON.parse(dataAsString);

    var readmeHeader = "# Developer Circle Jakarta - Public Data\n";
    readmeHeader += "\n![Generate README](https://github.com/devcjakarta/Public-Data/workflows/Generate%20README/badge.svg)\n";
    readmeHeader += "\nDeveloper Circle Jakarta - Public Data\n";
    var readmeContent = "\n";
    var tableOfContents = "\n## Daftar Event\n"
    tableOfContents += "\nsee [events.json](events.json)\n";
    var count = dataAsJson.data.length;
    dataAsJson.data.forEach(event => {
      tableOfContents += "\n- [" + event.name + "](#)"; //todo: add hyperlink

      readmeContent += "\n### " + event.name + "\n";
      readmeContent += "\n- Tanggal: " + event.date;
      if (event.time != ""){
        readmeContent += "\n- Pukul: " + event.time;
      }
      if (event.speaker.name != ""){
        readmeContent += "\n- Pembicara: " + event.speaker.name;
        if (event.speaker.title != ""){
          readmeContent += ", " + event.speaker.title;
        }
      }
      if (event.url != ""){
        readmeContent += "\n- " + event.url;
      }

      if (event.others !== undefined){
        const others = event.others;
        for (var item in others) {
          key = item.replace("_", " ");
          value = others[item];
          readmeContent += "\n- " + key + ': ' + value;
        }
      }

      readmeContent += "\n";
    });

    readmeContent += "\n";

    var readmeFooter = "\n## Bantu kami\n";
    readmeFooter += "\nBantu kami memperbarui daftar ini 🙏\n";
    readmeFooter += "\nPantau grup [Facebook Developer Circle Jakarta](https://www.facebook.com/groups/devcjakarta) dan silahkan perbarui data setiap kali ada sesi baru.\n";
    readmeFooter += "\nKami sangat berterima kasih untuk setiap bantuan yang teman-teman berikan.\n";
    readmeFooter += "\n----\n";
    readmeFooter += "\n©️ 2020 by DevC Jakarta Team";

    readmeContent = readmeHeader + tableOfContents + readmeContent + readmeFooter;
    console.log(readmeContent);
    fs.writeFile(path.resolve('./README.md'), readmeContent, function (err){
      if (err){
        return console.log('❌ Error write file README.md', err);
      }
      console.log('✅ Success write file README.md');
    });

  } catch (error) {
    console.error('❌ Error read file events.json', error);
  }
}

main();

