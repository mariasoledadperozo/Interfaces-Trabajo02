document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('bsSubscribeForm');
  const msg = document.getElementById('bsFormMessage');
  const cancel = document.getElementById('bsCancelBtn');

  cancel.addEventListener('click', () => {
    form.reset();
    msg.textContent = '';
    form.classList.remove('was-validated');
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    e.stopPropagation();

    form.classList.add('was-validated');

    if (!form.checkValidity()) {
      msg.textContent = 'Corrige los campos en rojo por favor.';
      msg.classList.remove('success');
      msg.classList.add('error');
      return;
    }

    const data = {
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      comment: form.comment.value.trim()
    };

    msg.textContent = '¡Gracias! Tu suscripción fue recibida.';
    msg.classList.remove('error');
    msg.classList.add('success');

    setTimeout(() => {
      form.reset();
      form.classList.remove('was-validated');
    }, 1200);

    console.log('Simulated submission (Bootstrap):', data);
  });
});
