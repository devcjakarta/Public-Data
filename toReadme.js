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
    var tableOfContents = "\n## Daftar Event 2020\n"
    tableOfContents += "\nsee [events.json](events.json)\n";
    var count = dataAsJson.data.length;
    var lastEvent = "";
    var indexEvent = 1;
    var link = "";
    dataAsJson.data.forEach(event => {
      link = doDashes(event.name);
      tableOfContents += "\n- [" + event.name + "](#"+link+")"; //todo: add hyperlink

      if ((indexEvent==1)&&(event.banner !== undefined)){
        lastEvent = "\n## Last Event";
        lastEvent += "\n\n![Last Event](files/image/" + event.banner + ")\n";
        //console.log(lastEvent);process.exit();
      }

      readmeContent += "\n### " + event.name + "\n";
      readmeContent += "\n- Tanggal: " + event.date;
      if (event.time != ""){
        readmeContent += "\n- Pukul: " + event.time;
      }
      if (Array.isArray(event.speaker)){
        readmeContent += "\n- Pembicara: ";
        event.speaker.forEach(item => {
          readmeContent += "\n  - " + item.name;
          if (item.title != ""){
            readmeContent += ", " + item.title;
          }
        });
      }else{
        if (event.speaker.name != ""){
          readmeContent += "\n- Pembicara: " + event.speaker.name;
          if (event.speaker.title != ""){
            readmeContent += ", " + event.speaker.title;
          }
        }  
      }
      if (event.url != ""){
        readmeContent += "\n- " + event.url;
      }

      if (event.others !== undefined){
        const others = event.others;
        for (var item in others) {
          key = item.replace("_url", "");
          key = key.replace("_", " ");
          value = others[item];
          if (value !== ""){
            readmeContent += "\n- [" + key + '](' + value + ')';
          }
        }
      }

      readmeContent += "\n";
      indexEvent++;
    });

    readmeContent += "\n";

    var readmeFooter = "\n## Bantu kami\n";
    readmeFooter += "\nBantu kami memperbarui daftar ini 🙏\n";
    readmeFooter += "\nPantau grup [Facebook Developer Circle Jakarta](https://www.facebook.com/groups/devcjakarta) dan silahkan perbarui data setiap kali ada sesi baru.\n";
    readmeFooter += "\nKami sangat berterima kasih untuk setiap bantuan yang teman-teman berikan.\n";
    readmeFooter += "\n----\n";
    readmeFooter += "\n©️ 2020 by DevC Jakarta Team";

    readmeContent = readmeHeader + lastEvent + tableOfContents + readmeContent + readmeFooter;
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

function doDashes(str) {
  return str.replace(/[^a-z0-9]+/gi, '-').replace(/^-*|-*$/g, '').toLowerCase();
}

main();

