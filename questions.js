const questions = [
    {number: 2, text: "This is the Customer the partner is still not assigned to the order"},
    {number: 3, text: "This is Customer incorrect materials are added to the Order"},
    {number: 4, text: "This is the Customer who wants to know what is the Surge charge.", metadata: "ISSUE - ENQURIY | SUB ISSUE - SHARE BOOKING DETAILS | Action taken - information given"},
    {number: 5, text: "This is the Customer wants to make the changes in the drop location"},
    {number: 6, text: "This is the Customer the quotation is high so want to cancel the order"},
    {number: 7, text: "This is the Customer I want to make the changes in the pickup location"},
    {number: 8, text: "This is the Customer the partner has not reached the pickup location"},
    {number: 9, text: "This is the Partners Customer said that he want to change the date and time for his order", metadata: "Issue: Changes in Order Requirement | Sub Issue: Reschedule | Action Taken: Information Given"},
    {number: 10, text: "This is the Customer why should I have to pay 80 % at pickup location in PTL order", metadata: "ISSUE - ENQURIY | SUB ISSUE - SHARE BOOKING DETAILS | Action taken - information given"},
    {number: 11, text: "This is the Vendor I cannot serve the order due to non-availability"},
    {number: 12, text: "This is the Vendor I can't do this order due to low quotation"},
    {number: 13, text: "This is the Customer Your partner is denying to serve the order"},
    {number: 14, text: "This is the Customer your partner has not carried enough packing materials", metadata: "Issue - Service Related | Sub issue - Not enough packing items | Action Taken: Information Given"},
    {number: 15, text: "This is the Partner I'm not able to find the customer's location", metadata: "Issue - enquiry | sub issue - contact details update request | Action taken - information given"},
    {number: 16, text: "This is the Customer your partner's number that is not reachable"},
    {number: 17, text: "This is the Customer the vehicle that was assigned for the order is incorrect"},
    {number: 18, text: "This is the Customer there are extra material"},
    {number: 19, text: "This is the Partner the customer requires a close vehicle and he doesn't have a closed vehicle"},
    {number: 20, text: "This is the Partner Customer material is heavy"},
    {number: 21, text: "This is the Customer your Partner is asking for fuel /toll charges"},
    {number: 22, text: "This is the Partner customer having the behaviours issue and abusing the labourers on his location"},
    {number: 23, text: "This is the Customer called and said partner is not behaving properly"},
    {number: 24, text: "This is the Customer I want to cancel the order due to shifting plan postpones"},
    {number: 25, text: "This is the partner In the drop location there is a change in the drop floor.", metadata: "Issue - Changes in Order Requirement | Sub Issue: Location Changes | Action Taken: Information Given"},
    {number: 26, text: "This is the Customer I want to keep the carton boxes with myself", metadata: "ISSUE - SERVICE RELATED | SUB ISSUE - CUSTOMER WANTS TO KEEP CARTONS | Action taken - information given"},
    {number: 27, text: "This is the Partner customer wants to keep carton boxes", metadata: "Issue - Changes in Order Requirement | Sub Issue: Location Changes | Action Taken: Information Given"},
    {number: 28, text: "This is the Customer I want to pay online but partner is asking for cash payment"},
    {number: 29, text: "This is the Partner there is no entry in drop location"},
    {number: 30, text: "This is the Customer wants porter Porter Wallet"},
    {number: 31, text: "This is the Partner I want to check if the customer has paid the order value in Porter Wallet"},
    {number: 32, text: "This is the Customer I have not received the invoice."},
    {number: 33, text: "This is the Customer My Computer table is damaged."},
    {number: 34, text: "This is the Customer I want to know do you provide packing / unpacking in the LBR order issue", metadata: "Issue enquiry | sub issue share booking details"},
    {number: 35, text: "This is the Partner owner Customer not received the feedback link"},
    {number: 36, text: "This is the Partner customer is not paying the order value"},
    {number: 37, text: "This is the Customer I want to cancel the order due to partner delay"},
    {number: 38, text: "This is the partner at the pickup location there is a union issue"},
    {number: 39, text: "This is the Partner the customers number is not reachable"},
    {number: 40, text: "This is the Partner he will not be able to serve the order due to a vehicle breakdown (within 48hrs/ before 48 hrs)"},
    {number: 41, text: "This is the Partner I will not be able to serve the order due to bad weather"},
    {number: 42, text: "This is the Customer I wanted a closed vehicle for the order."},
    {number: 43, text: "This is the Customer I want to know how many labours will reach to my location in LBR order", metadata: "Issue - enquiry | sub issue - share booking details | Action taken - information given"},
    {number: 44, text: "This is the Customer rope pulling is required in drop location (PTL Order)", metadata: "ISSUE - changes in order requirement | SUB ISSUE - add on services related issue (Electricians, carpenter etc) | Action taken - information given"},
    {number: 45, text: "This is the Customer what are the charges for extra labor", metadata: "Issue - enquiry | sub issue - share booking details | Action taken - information given"},
    {number: 46, text: "This is the Partner I will deliver the goods on the next day due to no entry time."},
    {number: 47, text: "This is the Partner kindly add the charge of professional carpenter due to complex furniture"},
    {number: 48, text: "This is the Partner Kindly add the amount of extra parking distance (pick up/drop location)"},
    {number: 49, text: "This is the Customer your partner is demanding for toll charges (LBR Order)", metadata: "Issue - payment related | sub issue - online | Action taken - information given"},
    {number: 50, text: "This is the Customer I want to cancel the LBR order due to a high quotation"},
    {number: 51, text: "This is the Customer I want more discount on the order"},
    {number: 52, text: "This is the Customer My complaint is that wrong quotation was shared to me"},
    {number: 53, text: "This is the Customer My valuable jewellery is missing"},
    {number: 54, text: "This is the Customer My goods left at the pick up location"},
    {number: 55, text: "This is the Customer I want to add a service of AC installation & uninstallation"},
    {number: 56, text: "This is the Partner Kindly add electrician charges for installation and uninstallation of the Ceiling fan."},
    {number: 57, text: "This is the Customer Can I shift plants/glass materials,gas cylinder in PTL Order", metadata: "Issue - enquiry | sub issue - share booking details | Action taken - information given"},
    {number: 58, text: "This is the Customer I want to add extra material in same quotation or else cancel the order"},
    {number: 59, text: "This is the Customer your partner is asking for a tips"},
    {number: 60, text: "This is the Partner there is no service lift and the staircase is narrow, rope pulling is required to carry alimarah."},
    {number: 61, text: "This is the Partner kindly add the charges because the service lift is not working but it is mentioned in the Order details", metadata: "Issue - Changes in Order Requirement | Sub Issue: Location Changes | Action Taken: Information Given"},
    {number: 62, text: "This is the Partner I'm not getting orders for the last few days", metadata: "Raised by - porter support | Issue - Non order related | sub issue - wallet recharge | Action taken - information given"},
    {number: 63, text: "This is the Partner I'm not able to check waypoints in the order in my application"},
    {number: 64, text: "This is the Customer I'm not able to cancel the order in Porter application"},
    {number: 65, text: "This is the Customer I want to know if the pre-delivery is possible for carton boxes in the PTL FTL order", metadata: "Issue - enquiry | sub issue - share booking details | Action taken - information given"},
    {number: 66, text: "This is the Customer how many layer packing service is provided in PTL & FTL services", metadata: "Issue - enquiry | sub issue - share booking details | Action taken - information given"},
    {number: 67, text: "This is the Customer I want the service of packing and unpacking of materials in the LBR order", metadata: "Issue - enquiry | sub issue - share booking details | Action taken - information given"},
    {number: 68, text: "This is the Partner I will not be able to serve LBR orders due to complex material"},
    {number: 69, text: "This is the Partner I will not be able to serve the order due to being engaged in a previous order"},
    {number: 70, text: "This is the Partner I will not able to serve the order due to a family emergency."},
    {number: 71, text: "This is the customer I had placed a LBR order through Spot Window & I'm not able to apply discount"},
    {number: 72, text: "This is the customer I have certain electronic items and fragile goods should I have to take single-layer or multiple-layer packing", metadata: "Issue - enquiry | sub issue - share booking details | Action taken - information given"},
    {number: 73, text: "This is The customer I have selected a package in which AC installation and uninstallation is covered completely now your partner is asking for extra charges for pipe, gas filling, wires etc", metadata: "Issue - payment | sub issue - extra amount collected | Action taken - information given"},
    {number: 74, text: "This is the customer will I get insurance for the goods that are transported"},
    {number: 75, text: "This is the customer what do you mean default package", metadata: "Issue - enquiry | sub issue - share booking details | Action taken - information given"},
    {number: 76, text: "This is the Vendor the company who had collected extra commission from me"},
    {number: 77, text: "This is LBR partner customer is loading 50 kg of shipment", metadata: "Issue - enquiry | sub issue - share booking details | Action taken - information given"},
    {number: 78, text: "This is the partner my id got suspended without any reason"},
    {number: 79, text: "This is the partner what is the distance covered in micro shifting & other packages"},
    {number: 80, text: "This is the customer I received feedback message on WhatsApp can you please help with the rating scale"},
    {number: 81, text: "This is the customer your Packers & Mover service is available for Pan India or limited state", metadata: "Issue - enquiry | sub issue - share booking details | Action taken - information given"},
    {number: 82, text: "This is a partner customer saying there are certain internal damages in goods"},
    {number: 83, text: "This is the customer what are the extra charges for the lift as the lift is not working in his building"},
    {number: 84, text: "This is the customer kindly add the Professional Carpenter charges in the bill"},
    {number: 85, text: "This is the customer I have 2 BHK kindly give me the quotation for 2 BHK"}
];