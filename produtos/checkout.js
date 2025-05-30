document.addEventListener("DOMContentLoaded", () => {
  // Elementos do formulário
  const paymentMethods = document.querySelectorAll('input[name="paymentMethod"]')
  const cardForm = document.getElementById("cardForm")
  const pixForm = document.getElementById("pixForm")
  const cashForm = document.getElementById("cashForm")
  const checkoutForm = document.getElementById("checkoutForm")

  // Atualizar o ano atual no footer
  document.getElementById("current-year").textContent = new Date().getFullYear()

  // Função para alternar entre métodos de pagamento
  function togglePaymentMethod() {
    const selectedMethod = document.querySelector('input[name="paymentMethod"]:checked').value

    // Ocultar todos os formulários
    cardForm.classList.add("d-none")
    pixForm.classList.add("d-none")
    cashForm.classList.add("d-none")

    // Mostrar o formulário correspondente
    if (selectedMethod === "credit") {
      cardForm.classList.remove("d-none")
    } else if (selectedMethod === "pix") {
      pixForm.classList.remove("d-none")
    } else if (selectedMethod === "cash") {
      cashForm.classList.remove("d-none")
    }

    // Atualizar campos obrigatórios
    updateRequiredFields(selectedMethod)
  }

  // Função para atualizar campos obrigatórios baseado no método de pagamento
  function updateRequiredFields(paymentMethod) {
    const cardFields = ["cardName", "cardNumber", "expDate", "cvv", "installments"]

    cardFields.forEach((fieldId) => {
      const field = document.getElementById(fieldId)
      if (field) {
        if (paymentMethod === "credit") {
          field.setAttribute("required", "")
        } else {
          field.removeAttribute("required")
        }
      }
    })
  }

  // Event listeners para métodos de pagamento
  paymentMethods.forEach((method) => {
    method.addEventListener("change", togglePaymentMethod)
  })

  // Formatação do número do cartão
  const cardNumberInput = document.getElementById("cardNumber")
  if (cardNumberInput) {
    cardNumberInput.addEventListener("input", function (e) {
      let value = this.value.replace(/\D/g, "")
      if (value.length > 0) {
        value = value.match(/.{1,4}/g).join(" ")
      }
      this.value = value
    })
  }

  // Formatação da data de validade
  const expDateInput = document.getElementById("expDate")
  if (expDateInput) {
    expDateInput.addEventListener("input", function (e) {
      let value = this.value.replace(/\D/g, "")
      if (value.length > 2) {
        value = value.substring(0, 2) + "/" + value.substring(2, 4)
      }
      this.value = value
    })
  }

  // Formatação do CVV
  const cvvInput = document.getElementById("cvv")
  if (cvvInput) {
    cvvInput.addEventListener("input", function (e) {
      this.value = this.value.replace(/\D/g, "").substring(0, 3)
    })
  }

  // Formatação do telefone
  const phoneInput = document.getElementById("phone")
  if (phoneInput) {
    phoneInput.addEventListener("input", function (e) {
      let value = this.value.replace(/\D/g, "")
      if (value.length > 0) {
        if (value.length <= 10) {
          value = value.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3")
        } else {
          value = value.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3")
        }
      }
      this.value = value
    })
  }

  // Definir data mínima para retirada (hoje)
  const pickupDateInput = document.getElementById("pickupDate")
  if (pickupDateInput) {
    const today = new Date().toISOString().split("T")[0]
    pickupDateInput.setAttribute("min", today)
  }

  // Submissão do formulário
  if (checkoutForm) {
    checkoutForm.addEventListener("submit", function (e) {
      e.preventDefault()

      // Validação básica
      const requiredFields = this.querySelectorAll("[required]")
      let isValid = true

      requiredFields.forEach((field) => {
        if (!field.value.trim()) {
          field.classList.add("is-invalid")
          isValid = false
        } else {
          field.classList.remove("is-invalid")
        }
      })

      if (isValid) {
        // Simular processamento
        const submitBtn = document.querySelector('button[type="submit"]')
        const originalText = submitBtn.innerHTML

        submitBtn.innerHTML = '<i class="bi bi-hourglass-split me-2"></i>Processando...'
        submitBtn.disabled = true

        setTimeout(() => {
          const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked').value
          let message = "Pedido realizado com sucesso! "

          if (paymentMethod === "pix") {
            message += "Você receberá o QR Code do PIX por e-mail e WhatsApp. "
          } else if (paymentMethod === "cash") {
            message += "Prepare o dinheiro para o pagamento na retirada. "
          }

          message += "Você pode retirar seus produtos na barbearia durante nosso horário de funcionamento."

          alert(message)

          // Redirecionar para página de confirmação ou home
          // window.location.href = "confirmacao.html";

          submitBtn.innerHTML = originalText
          submitBtn.disabled = false
        }, 2000)
      } else {
        alert("Por favor, preencha todos os campos obrigatórios.")
      }
    })
  }

  // Inicializar
  togglePaymentMethod()
})
