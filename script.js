function changeType() {
  document.querySelectorAll('.block').forEach(b => b.style.display = 'none');
  const type = document.getElementById('type').value;
  if (type) document.getElementById(type).style.display = 'block';
}

async function generatePDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  // загрузка шрифта
  const font = await fetch("Roboto-Regular.ttf").then(res => res.arrayBuffer());
  const fontBase64 = btoa(
    new Uint8Array(font).reduce((data, byte) => data + String.fromCharCode(byte), '')
  );

  doc.addFileToVFS("Roboto-Regular.ttf", fontBase64);
  doc.addFont("Roboto-Regular.ttf", "Roboto", "normal");
  doc.setFont("Roboto");
  doc.setFontSize(12);

  let y = 20;

  const add = (text) => {
    doc.text(text, 20, y, { maxWidth: 170 });
    y += 8;
  };

  // Заголовок
  doc.setFontSize(14);
  doc.text("ДОГОВОР № __", 105, y, { align: "center" });
  y += 10;
  doc.text("на оказание рекламных и SEO-услуг", 105, y, { align: "center" });
  y += 15;

  doc.setFontSize(12);
  add(г. ____________        Дата: ${date.value});

  y += 10;
  add(1. ПРЕДМЕТ ДОГОВОРА);
  add(1.1. Исполнитель обязуется оказать рекламные и SEO-услуги, а Заказчик обязуется принять и оплатить указанные услуги.);

  y += 6;
  add(2. СТОИМОСТЬ И ПОРЯДОК РАСЧЁТОВ);
  add(2.1. Общая сумма договора составляет ${sum.value} тенге.);
  add(2.2. Рекламный бюджет составляет ${ads.value} тенге.);
  add(2.3. Ежемесячная стоимость SEO-услуг составляет ${seo.value} тенге.);

  y += 6;
  add(3. ПРАВА И ОБЯЗАННОСТИ СТОРОН);
  add(3.1. Исполнитель обязуется оказать услуги качественно и в срок.);
  add(3.2. Заказчик обязуется своевременно произвести оплату.);

  y += 6;
  add(4. ОТВЕТСТВЕННОСТЬ СТОРОН);
  add(4.1. Стороны несут ответственность в соответствии с законодательством Республики Казахстан.);

  y += 6;
  add(5. СРОК ДЕЙСТВИЯ ДОГОВОРА);
  add(5.1. Договор вступает в силу с даты подписания и действует до полного исполнения обязательств.);

  y += 6;
  add(6. ЗАКЛЮЧИТЕЛЬНЫЕ ПОЛОЖЕНИЯ);
  add(6.1. Договор составлен в двух экземплярах, имеющих одинаковую юридическую силу.);

  y += 10;
  add(7. РЕКВИЗИТЫ И ПОДПИСИ СТОРОН);

  const type = document.getElementById("type").value;

  y += 8;
  if (type === "too") {
    add(Заказчик: ${company.value});
    add(Директор: ${director.value});
    add(Адрес: ${address.value});
    add(БИН: ${bin.value});
    add(Банк: ${bank.value});
    add(КБе: ${kbe.value});
    add(БИК: ${bik.value});
    add(Счёт: ${account.value});
  }

  if (type === "ip") {
    add(Заказчик: ${ip_company.value});
    add(Адрес: ${ip_address.value});
    add(ИИН: ${iin.value});
    add(Банк: ${ip_bank.value});
    add(КБе: ${ip_kbe.value});
    add(БИК: ${ip_bik.value});
    add(Счёт: ${ip_account.value});
  }

  if (type === "person") {
    add(Заказчик: ${fio.value});
    add(Адрес: ${p_address.value});
    add(Телефон: ${phone.value});
  }

  y += 15;
  add(Подпись Заказчика: ______________________);

  doc.save("dogovor.pdf");
}
