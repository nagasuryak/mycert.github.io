let name = document.getElementById('name');
let submit = document.getElementById('submit');
Let orgg = document.getElementById('orgg');
submit.addEventListener('click',()=>{
    let credentialUser = Math.ceil(Math.random()*10000);
    let str = "TEAMAWR"+credentialUser.toString();
    generetPdf(name.value,str);
    name.value = '';
})


const generetPdf = async (name,cr,orgg)=>{
    const {PDFDocument,rgb} = PDFLib;

    const exBytes = await fetch("./Certificate.pdf").then((res)=>{
        return res.arrayBuffer()
    });

    const exFont = await fetch('./Ubuntu-Regular.ttf').then((res)=>{
        return res.arrayBuffer();
    })


    
    
    const pdfDoc = await PDFDocument.load(exBytes)
    
    pdfDoc.registerFontkit(fontkit);
    const myFont = await pdfDoc.embedFont(exFont);

    const pages = pdfDoc.getPages();
    const firstP = pages[0];
    firstP.drawText(name,{
        x:172.8,
        y:374.4,
        size:70,
        font:myFont,
        color: rgb(.2, 0.84, 0.67)
    })

    firstP.drawText(cr,{
        x:806.4,
        y:720,
        size:20,
        font:myFont,
        color: rgb(0, 0.76, 0.8)
    })

     firstP.drawText(orgg,{
        x:393.6,
        y:316.8,
        size:15,
        font:myFont,
        color: rgb(0, 0.76, 0.8)
    })

    const uri = await pdfDoc.saveAsBase64({dataUri: true});
    saveAs(uri,"Certificate.pdf",{autoBom:true})
    // document.querySelector("#myPDF").src = uri;
};