window.onload = function() {
    const form = document.getElementById('contact-form');
    const btn = form.querySelector('input[type="submit"]');
    
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Desabilita botão durante processamento
        btn.disabled = true;
        btn.value = 'Processando...';
        
        const formData = new FormData(form);
        
        // Captura dados
        const dados = {
            nome: formData.get('name'),
            email: formData.get('email'),
            telefone: formData.get('phone') || 'Não informado',
            interesse: formData.get('interest'),
            mensagem: formData.get('message')
        };
        
        // Validação
        if (!dados.nome || !dados.email || !dados.interesse || !dados.mensagem) {
            alert('⚠️ Por favor, preencha todos os campos obrigatórios.');
            btn.disabled = false;
            btn.value = 'Enviar';
            return;
        }
        
        // Monta e-mail
        const assunto = `Contato do Portfólio - ${dados.interesse}`;
        const corpo = `
Olá Samuel,

Nova mensagem do seu portfólio:

═══════════════════════════════════════
DADOS DO CONTATO
═══════════════════════════════════════

Nome: ${dados.nome}
E-mail: ${dados.email}
WhatsApp: ${dados.telefone}
Interesse: ${dados.interesse}

═══════════════════════════════════════
MENSAGEM
═══════════════════════════════════════

${dados.mensagem}

---
Enviado através do formulário do portfólio
        `.trim();
        
        const mailtoLink = `mailto:prodtaika@gmail.com?subject=${encodeURIComponent(assunto)}&body=${encodeURIComponent(corpo)}`;
        
        // Tenta abrir em nova janela
        try {
            const opened = window.open(mailtoLink, '_blank');
            
            setTimeout(() => {
                btn.disabled = false;
                btn.value = 'Enviar';
                
                if (opened === null || typeof opened === 'undefined') {
                    // Pop-up foi bloqueado
                    alert('⚠️ Pop-up bloqueado! Permitindo pop-ups, tentando novamente...');
                    window.location.href = mailtoLink;
                } else {
                    alert('✅ Cliente de e-mail aberto! Por favor, complete o envio.');
                    form.reset();
                }
            }, 500);
        } catch (error) {
            console.error('Erro ao abrir mailto:', error);
            alert('❌ Erro ao abrir cliente de e-mail. Entre em contato por: samuel.fonseca@sempreceub.com');
            btn.disabled = false;
            btn.value = 'Enviar';
        }
    });
    
    // Validação de e-mail em tempo real
    const emailInput = document.getElementById('email');
    emailInput.addEventListener('blur', function() {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (this.value && !emailPattern.test(this.value)) {
            this.style.borderColor = '#ef4444';
            this.style.boxShadow = '0 0 0 3px rgba(239, 68, 68, 0.1)';
            alert('⚠️ Por favor, insira um e-mail válido.');
        } else {
            this.style.borderColor = '';
            this.style.boxShadow = '';
        }
    });
    
    console.log('✅ Script de formulário carregado com sucesso!');
};