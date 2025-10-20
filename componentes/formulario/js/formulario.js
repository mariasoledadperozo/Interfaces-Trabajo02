      // Esperamos a que todo el DOM esté cargado
document.addEventListener('DOMContentLoaded',function () {
  'use strict';

  function createMessageElement(form) {
    const p = document.createElement('p');
    p.id = 'bsFormMessage';
    p.className = 'mb-0 small';
    p.setAttribute('aria-live', 'polite');
    const container = form.querySelector('.mt-3') || form;
    container.appendChild(p);
    return p;
  }

  function initForm() {
    try {
      const form = document.getElementById('bsSubscribeForm');
      if (!form) {
        console.warn('formulario.js: no se encontró #bsSubscribeForm — inicialización abortada.');
        return;
      }

      const msg = document.getElementById('bsFormMessage') || createMessageElement(form);

      const btnCancel = document.getElementById('bsCancelBtn') || form.querySelector('[type="reset"], .btn-cancel');

      const inputName = document.getElementById('bsName') || form.querySelector('[name="name"], input[type="text"]');
      const inputEmail = document.getElementById('bsEmail') || form.querySelector('[name="email"], input[type="email"]');
      const inputComment = document.getElementById('bsComment') || form.querySelector('[name="comment"], textarea');

      if (!inputName || !inputEmail) {
        console.warn('formulario.js: faltan inputs obligatorios (name / email).');
        msg.textContent = 'Formulario no disponible (faltan campos).';
        msg.classList && msg.classList.add('error');
        return;
      }

      function setMessage(text, type) {
        if (!msg) return;
        msg.textContent = text || '';
        if (msg.classList) {
          msg.classList.remove('success', 'error');
          if (type) msg.classList.add(type);
        }
      }

      if (btnCancel) {
        btnCancel.addEventListener('click', function (ev) {
          ev && ev.preventDefault();
          try {
            inputName.value = '';
            inputEmail.value = '';
            if (inputComment) inputComment.value = '';
            form.classList && form.classList.remove('was-validated');
            setMessage('', null);
          } catch (err) {
            console.error('formulario.js: error en handler cancelar:', err);
          }
        });
      }

      form.addEventListener('submit', function (e) {
        e && e.preventDefault();
        e && e.stopPropagation();
        try {
          form.classList && form.classList.add('was-validated');

          const nameVal = (inputName.value || '').trim();
          const emailVal = (inputEmail.value || '').trim();

          if (!nameVal || !emailVal) {
            setMessage('Corrige los campos en rojo por favor.', 'error');
            return;
          }

          const emailSimple = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailSimple.test(emailVal)) {
            setMessage('Introduce un correo electrónico válido.', 'error');
            return;
          }

          const data = {
            name: nameVal,
            email: emailVal,
            comment: inputComment ? (inputComment.value || '').trim() : ''
          };

          console.log('formulario.js: envío simulado', data);

          setMessage('¡Gracias! Tu suscripción fue recibida.', 'success');

          setTimeout(() => {
            try {
              inputName.value = '';
              inputEmail.value = '';
              if (inputComment) inputComment.value = '';
              form.classList && form.classList.remove('was-validated');
              setMessage('', null);
            } catch (err) {
              console.error('formulario.js: error en reset after submit:', err);
            }
          }, 1200);
        } catch (err) {
          console.error('formulario.js: error en submit handler:', err);
          setMessage('Ocurrió un error al enviar el formulario.', 'error');
        }
      });
    } catch (err) {
      console.error('formulario.js: error inicializando módulo:', err);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initForm);
  } else {
    initForm();
  }
})();
// ...existing code...