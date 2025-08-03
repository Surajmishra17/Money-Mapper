// Global state variables
let selectedPropertyType = null;
let selectedPropertyOption = null;
let currentStep = 1;

// Function to open the modal and initialize it for a specific property type
function addProperty(type) {
    selectedPropertyType = type;
    currentStep = 1;

    // Setup property options based on type
    const optionsContainer = document.getElementById('propertyOptions');
    let options = [];

    if (type === 'house') {
        options = ['1 Room', '2 Rooms', '3 Rooms', '4 Rooms', '5+ Rooms'];
    } else if (type === 'flat') {
        options = ['1BHK', '2BHK', '3BHK', '4BHK', '5BHK'];
    }

    optionsContainer.innerHTML = '';
    options.forEach(option => {
        const btn = document.createElement('button');
        btn.className = 'property-option';
        btn.textContent = option;
        btn.onclick = () => selectPropertyOption(btn, option);
        optionsContainer.appendChild(btn);
    });

    // Reset form inputs for a new entry
    document.getElementById('tenantName').value = '';
    document.getElementById('monthlyRent').value = '';
    document.getElementById('electricityRate').value = '';
    document.getElementById('electricityUnits').value = '';
    document.getElementById('waterUsage').value = '';

    document.getElementById('propertyModal').style.display = 'block';
    showStep(1);
    document.getElementById('nextBtn1').disabled = true; // Initially disable the next button
}

// Function to handle the selection of a property option
function selectPropertyOption(btn, option) {
    document.querySelectorAll('.property-option').forEach(b => {
        b.classList.remove('selected');
    });

    btn.classList.add('selected');
    selectedPropertyOption = option;
    document.getElementById('nextBtn1').disabled = false;
}

// Function to move to the next step in the modal
function nextStep() {
    if (currentStep === 1) {
        if (!selectedPropertyOption) {
            alert('Please select a property option');
            return;
        }
        currentStep = 2;
        showStep(2);
    } else if (currentStep === 2) {
        const tenantName = document.getElementById('tenantName').value;
        const monthlyRent = document.getElementById('monthlyRent').value;

        if (!tenantName || !monthlyRent) {
            alert('Please fill all tenant details');
            return;
        }

        currentStep = 3;
        showStep(3);
    }
}

// Function to move to the previous step in the modal
function prevStep() {
    if (currentStep > 1) {
        currentStep--;
        showStep(currentStep);
    }
}

// Function to display a specific step of the modal
function showStep(step) {
    for (let i = 1; i <= 4; i++) {
        const stepElement = document.getElementById(`step${i}`);
        if (stepElement) {
            stepElement.classList.add('hidden');
        }
    }

    const currentStepElement = document.getElementById(`step${step}`);
    if (currentStepElement) {
        currentStepElement.classList.remove('hidden');
    }

    // Update button visibility based on step
    const nextBtn1 = document.getElementById('nextBtn1');
    const nextBtn2 = document.getElementById('nextBtn2');
    const prevBtn2 = document.getElementById('prevBtn2');
    const prevBtn3 = document.getElementById('prevBtn3');

    if (nextBtn1) nextBtn1.classList.toggle('hidden', step !== 1);
    if (nextBtn2) nextBtn2.classList.toggle('hidden', step !== 2);
    if (prevBtn2) prevBtn2.classList.toggle('hidden', step !== 2);
    if (prevBtn3) prevBtn3.classList.toggle('hidden', step !== 3);
}

// Function to generate the rent receipt
function generateReceipt() {
    const tenantName = document.getElementById('tenantName').value;
    const monthlyRent = parseFloat(document.getElementById('monthlyRent').value);
    const electricityRate = parseFloat(document.getElementById('electricityRate').value);
    const electricityUnits = parseFloat(document.getElementById('electricityUnits').value);
    const waterUsage = parseFloat(document.getElementById('waterUsage').value);

    if (!electricityRate || !electricityUnits || !waterUsage) {
        alert('Please fill all electricity and water details');
        return;
    }

    const electricityBill = electricityRate * electricityUnits;
    const totalAmount = monthlyRent + electricityBill + waterUsage;

    const receiptContent = `
        <h2>RENT RECEIPT</h2>
        <div style="text-align: center; margin-bottom: 20px;">
            <strong>Money Mapper</strong><br>
            Date: ${new Date().toLocaleDateString()}
        </div>
        
        <div class="receipt-item">
            <span><strong>Tenant Name:</strong></span>
            <span>${tenantName}</span>
        </div>
        
        <div class="receipt-item">
            <span><strong>Property Type:</strong></span>
            <span>${selectedPropertyType.charAt(0).toUpperCase() + selectedPropertyType.slice(1)} - ${selectedPropertyOption}</span>
        </div>
        
        <div class="receipt-item">
            <span><strong>Monthly Rent:</strong></span>
            <span>₹${monthlyRent.toFixed(2)}</span>
        </div>
        
        <div class="receipt-item">
            <span><strong>Electricity (${electricityUnits} units @ ₹${electricityRate}/unit):</strong></span>
            <span>₹${electricityBill.toFixed(2)}</span>
        </div>
        
        <div class="receipt-item">
            <span><strong>Water Usage:</strong></span>
            <span>₹${waterUsage.toFixed(2)}</span>
        </div>
        
        <div class="receipt-item receipt-total">
            <span><strong>TOTAL AMOUNT:</strong></span>
            <span><strong>₹${totalAmount.toFixed(2)}</strong></span>
        </div>
        
        <div style="text-align: center; margin-top: 30px; font-size: 12px; color: #666;">
            Generated by Money Mapper<br>
            Thank you for using our service!
        </div>
    `;

    document.getElementById('receiptContent').innerHTML = receiptContent;
    currentStep = 4;
    showStep(4);
}

// Function to download/print the receipt
function downloadReceipt() {
    const receiptContent = document.getElementById('receiptContent').innerHTML;
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
        <html>
            <head>
                <title>Rent Receipt</title>
                <style>
                    body { font-family: Arial, sans-serif; margin: 20px; }
                    .receipt-item { display: flex; justify-content: space-between; margin-bottom: 10px; padding: 8px 0; border-bottom: 1px solid #eee; }
                    .receipt-total { font-weight: bold; font-size: 18px; border-top: 2px solid #30d12d; padding-top: 15px; margin-top: 15px; }
                    h2 { color: #30d12d; text-align: center; }
                </style>
            </head>
            <body>
                ${receiptContent}
            </body>
        </html>
    `);
    printWindow.document.close();
    printWindow.print();
}

// Function to close any modal and reset its state
function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
    resetPropertyModal();
}

// Function to reset the property modal's state
function resetPropertyModal() {
    selectedPropertyType = null;
    selectedPropertyOption = null;
    currentStep = 1;
    document.getElementById('nextBtn1').disabled = true;

    // Reset form fields
    const formFields = ['tenantName', 'monthlyRent', 'electricityRate', 'electricityUnits', 'waterUsage'];
    formFields.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.value = '';
        }
    });

    // Remove selected class from all option buttons
    document.querySelectorAll('.property-option').forEach(btn => {
        btn.classList.remove('selected');
    });
}

// Event listeners for the main page buttons
document.addEventListener('DOMContentLoaded', function () {
    console.log('Money Mapper App initialized');

    const addHouseBtn = document.querySelector('.btn.add-house');
    const addFlatBtn = document.querySelector('.btn.add-flat');

    if (addHouseBtn) {
        addHouseBtn.addEventListener('click', () => addProperty('house'));
    }

    if (addFlatBtn) {
        addFlatBtn.addEventListener('click', () => addProperty('flat'));
    }

    // Event listeners for modal buttons (assuming they exist)
    const nextBtn1 = document.getElementById('nextBtn1');
    const nextBtn2 = document.getElementById('nextBtn2');
    const prevBtn2 = document.getElementById('prevBtn2');
    const prevBtn3 = document.getElementById('prevBtn3');
    const generateReceiptBtn = document.getElementById('generateReceiptBtn');
    const downloadReceiptBtn = document.getElementById('downloadReceiptBtn');
    const closeModalBtn = document.querySelector('#propertyModal .close');

    if (nextBtn1) nextBtn1.addEventListener('click', nextStep);
    if (nextBtn2) nextBtn2.addEventListener('click', nextStep);
    if (prevBtn2) prevBtn2.addEventListener('click', prevStep);
    if (prevBtn3) prevBtn3.addEventListener('click', prevStep);
    if (generateReceiptBtn) generateReceiptBtn.addEventListener('click', generateReceipt);
    if (downloadReceiptBtn) downloadReceiptBtn.addEventListener('click', downloadReceipt);
    if (closeModalBtn) closeModalBtn.addEventListener('click', () => closeModal('propertyModal'));

    // Close modal when clicking outside
    window.onclick = function (event) {
        const modal = document.getElementById('propertyModal');
        if (modal && event.target === modal) {
            closeModal('propertyModal');
        }
    };
});