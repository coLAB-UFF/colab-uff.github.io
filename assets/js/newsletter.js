document.addEventListener("DOMContentLoaded", function () {
  var endpoint = window.NEWSLETTER_ENDPOINT;
  var forms = document.querySelectorAll(".hero__form, .newsletter-form");

  forms.forEach(function (form) {
    var input = form.querySelector('input[type="email"]');
    var button = form.querySelector('button[type="submit"]');
    if (!input || !button) return;

    var message = document.createElement("p");
    message.className = "newsletter-form__message";
    form.parentNode.insertBefore(message, form.nextSibling);

    function setMessage(text, isError) {
      message.textContent = text;
      message.classList.toggle("is-error", !!isError);
      message.classList.toggle("is-success", !isError);
    }

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var email = (input.value || "").trim();

      if (!email || !input.checkValidity()) {
        setMessage("Digite um e-mail válido.", true);
        return;
      }
      if (!endpoint) {
        setMessage("Inscrição indisponível no momento.", true);
        return;
      }

      button.disabled = true;
      var formData = new FormData();
      formData.append("email", email);

      fetch(endpoint, { method: "POST", mode: "no-cors", body: formData })
        .then(function () {
          setMessage("Inscrição confirmada. Obrigado!", false);
          input.value = "";
        })
        .catch(function () {
          setMessage("Não foi possível concluir a inscrição. Tente novamente.", true);
        })
        .finally(function () {
          button.disabled = false;
        });
    });
  });
});
