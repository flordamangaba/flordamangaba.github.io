// Script comum do site da Associação Flor da Mangaba
(function () {
  const btn = document.querySelector('.menu-btn');
  const menu = document.querySelector('.menu');
  if (btn && menu) {
    btn.addEventListener('click', () => {
      const aberto = menu.classList.toggle('aberto');
      btn.setAttribute('aria-expanded', aberto);
    });
    menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => menu.classList.remove('aberto')));
  }

  // Botões "copiar" do PIX
  const aviso = document.querySelector('.aviso');
  document.querySelectorAll('[data-copiar]').forEach(b => b.addEventListener('click', async () => {
    try { await navigator.clipboard.writeText(b.dataset.copiar); aviso.textContent = 'Copiado! Agora é só colar no app do seu banco.'; }
    catch (e) { aviso.textContent = 'Não foi possível copiar. Chave: ' + b.dataset.copiar; }
    aviso.classList.add('visivel');
    setTimeout(() => aviso.classList.remove('visivel'), 3500);
  }));

  // Newsletter: envia para o Formulário Google da Associação (respostas na planilha do Drive)
  const CAMPOS = { nome: 'entry.1140441831', email: 'entry.570637387', whatsapp: 'entry.1372885303', aceite: 'entry.1768518739' };
  const TEXTO_ACEITE = 'Autorizo a Associação Flor da Mangaba a guardar meus dados para me enviar novidades. Posso pedir para sair a qualquer momento.';
  document.querySelectorAll('.news-form').forEach(form => form.addEventListener('submit', async e => {
    e.preventDefault();
    const msg = form.querySelector('.news-msg');
    const f = form.elements;
    if (f.site.value) return; // robô
    if (!form.checkValidity()) { form.reportValidity(); return; }
    const dados = new FormData();
    dados.append(CAMPOS.nome, f.nome.value.trim());
    dados.append(CAMPOS.email, f.email.value.trim());
    dados.append(CAMPOS.whatsapp, f.whatsapp.value.trim());
    dados.append(CAMPOS.aceite, TEXTO_ACEITE);
    const botao = form.querySelector('button');
    botao.disabled = true;
    msg.textContent = 'Enviando…';
    try {
      await fetch(form.dataset.form, { method: 'POST', mode: 'no-cors', body: dados });
      form.reset();
      msg.textContent = 'Pronto! Você vai receber as novidades da Flor da Mangaba.';
    } catch (err) {
      msg.textContent = 'Não foi possível enviar agora. Tente de novo ou fale com a gente pelo WhatsApp.';
    }
    botao.disabled = false;
  }));
})();
