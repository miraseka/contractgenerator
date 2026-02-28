function changeType() {
  document.querySelectorAll('.block').forEach(b => b.style.display = 'none');
  const type = document.getElementById('type').value;
  if (type) document.getElementById(type).style.display = 'block';
}

async function generatePDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  // Загружаем шрифт
  const font = await fetch("Roboto-Regular.ttf").then(res => res.arrayBuffer());
  const fontBase64 = btoa(
    new Uint8Array(font).reduce((data, byte) => data + String.fromCharCode(byte), '')
  );

  doc.addFileToVFS("Roboto-Regular.ttf", fontBase64);
  doc.addFont("Roboto-Regular.ttf", "Roboto", "normal");
  doc.setFont("Roboto");

  let text = `
ДОГОВОР

Дата договора: ${date.value}

Сумма договора: ${sum.value} тг
Сумма рекламного бюджета: ${ads.value} тг
Ежемесячная сумма SEO: ${seo.value} тг
`;

  const type = document.getElementById("type").value;

  if (type === "too") {
    text += `
Компания: ${company.value}
Директор: ${director.value}
Адрес: ${address.value}
БИН: ${bin.value}
Банк: ${bank.value}
КБе: ${kbe.value}
БИК: ${bik.value}
Счёт: ${account.value}
`;
  }

  if (type === "ip") {
    text += `
Компания: ${ip_company.value}
Адрес: ${ip_address.value}
ИИН: ${iin.value}
Банк: ${ip_bank.value}
КБе: ${ip_kbe.value}
БИК: ${ip_bik.value}
Счёт: ${ip_account.value}
`;
  }

  if (type === "person") {
    text += `
ФИО: ${fio.value}
Адрес: ${p_address.value}
Телефон: ${phone.value}
`;
  }

  doc.text(text, 10, 10, { maxWidth: 180 });
  doc.save("dogovor.pdf");
}