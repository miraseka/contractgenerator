function changeType() {
  document.querySelectorAll('.block').forEach(b => b.style.display = 'none');
  const type = document.getElementById('type').value;
  if (type) document.getElementById(type).style.display = 'block';
}

function generatePDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ unit: "mm", format: "a4" });

  doc.setFont("Times", "normal");
  doc.setFontSize(12);

  let y = 20;
  const line = (t) => {
    doc.text(t, 20, y, { maxWidth: 170 });
    y += 8;
  };

  // Заголовок
  doc.setFontSize(14);
  doc.text("ДОГОВОР № ___", 105, y, { align: "center" });
  y += 8;
  doc.text("на оказание рекламных и SEO-услуг", 105, y, { align: "center" });
  y += 15;

  doc.setFontSize(12);
  line(г. ____________        Дата: ${date.value});

  y += 6;
  line("1. ПРЕДМЕТ ДОГОВОРА");
  line("1.1. Исполнитель обязуется оказать рекламные и SEO-услуги, а Заказчик обязуется принять и оплатить указанные услуги.");

  y += 4;
  line("2. СТОИМОСТЬ И ПОРЯДОК РАСЧЁТОВ");
  line(2.1. Общая сумма договора составляет ${sum.value} тенге.);
  line(2.2. Рекламный бюджет составляет ${ads.value} тенге.);
  line(2.3. Ежемесячная стоимость SEO-услуг составляет ${seo.value} тенге.);

  y += 4;
  line("3. ПРАВА И ОБЯЗАННОСТИ СТОРОН");
  line("3.1. Исполнитель обязуется оказать услуги качественно и в срок.");
  line("3.2. Заказчик обязуется своевременно произвести оплату.");

  y += 4;
  line("4. ОТВЕТСТВЕННОСТЬ СТОРОН");
  line("4.1. Стороны несут ответственность в соответствии с законодательством Республики Казахстан.");

  y += 4;
  line("5. СРОК ДЕЙСТВИЯ ДОГОВОРА");
  line("5.1. Договор вступает в силу с даты подписания и действует до полного исполнения обязательств.");

  y += 4;
  line("6. ЗАКЛЮЧИТЕЛЬНЫЕ ПОЛОЖЕНИЯ");
  line("6.1. Договор составлен в двух экземплярах, имеющих одинаковую юридическую силу.");

  y += 6;
  line("7. РЕКВИЗИТЫ И ПОДПИСИ СТОРОН");

  const type = document.getElementById("type").value;

  y += 6;
  if (type === "too") {
    line(Заказчик: ${company.value});
    line(Директор: ${director.value});
    line(Адрес: ${address.value});
    line(БИН: ${bin.value});
    line(Банк: ${bank.value});
    line(КБе: ${kbe.value});
    line(БИК: ${bik.value});
    line(Счёт: ${account.value});
  }

  if (type === "ip") {
    line(Заказчик: ${ip_company.value});
    line(Адрес: ${ip_address.value});
    line(ИИН: ${iin.value});
    line(Банк: ${ip_bank.value});
    line(КБе: ${ip_kbe.value});
    line(БИК: ${ip_bik.value});
    line(Счёт: ${ip_account.value});
  }

  if (type === "person") {
    line(Заказчик: ${fio.value});
    line(Адрес: ${p_address.value});
    line(Телефон: ${phone.value});
  }

  y += 12;
  line("Подпись Заказчика: ________");

  doc.save("dogovor.pdf");
}
