//BS_AVION
document
    .querySelector("#calculateButton")
    .addEventListener("click", calculateTotalPrice);
document.querySelector("#ticketForm").addEventListener("submit", function (e) {
    e.preventDefault();
    alert(
        "Vaše objednávka byla přijata ke zpracování. O vyřízení Vás budeme informovat. Děkujeme, že využíváte našich služeb."
    );
    this.reset();
    document.querySelector("#submitButton").disabled = true;
    document.querySelector('#totalPrice').textContent = "";
});

document.querySelector("#note").addEventListener("input", function () {
    // Povolené znaky: písmena a číslice -> pomocí regulárního výrazu
    this.value = this.value.replace(
        /[^a-zA-Z0-9 áčďéěíňóřšťúůýžÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ.,]/g,
        ""
    );
});

function calculateTotalPrice() {
    // Získání ceny letenky a počtu letenek
    const pricePerTicket = parseInt(
        document.querySelector("#destination").value,
        10
    );
    const ticketCount = parseInt(
        document.querySelector("#ticketCount").value,
        10
    );

    // Výpočet základní ceny
    let totalPrice = pricePerTicket * ticketCount;

    // Kontrola, zda je zpáteční letenka
    if (document.querySelector("#returnTicket").checked) {
        totalPrice *= 2; // Dvojnásobení ceny
    }

    // Přirážka za třídu
    const classMultiplier = parseFloat(
        document.querySelector(".class:checked").value
    );
    totalPrice *= classMultiplier;

    // Zobrazení celkové ceny
    document.querySelector(
        "#totalPrice"
    ).value = `Celková cena: ${totalPrice} Kč`;

    // Kontrola rozpočtu
    const budget = parseInt(document.querySelector("#budget").value, 10);
    if (budget >= totalPrice) {
        document.querySelector(
            "#totalPrice"
        ).textContent = `${totalPrice} Kč. Nyní můžete přejít k závaznému objednání`;
        document.querySelector("#submitButton").disabled = false;
    } else {
        document.querySelector(
            "#totalPrice"
        ).textContent = `${totalPrice} Kč. Váš zadaný rozpočet je nedostatečný. Vaši objednávku nelze zpracovat.`;
        document.querySelector("#submitButton").disabled = true;
    }
}
