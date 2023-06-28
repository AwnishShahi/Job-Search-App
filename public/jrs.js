$(document).ready(function () {
    // Display the job results on the page
    function displayJobResults(data) {
        const jobResults = $("#jobResults");
        jobResults.empty();

        if (data.results.length === 0) {
            jobResults.append("<p>No jobs found.</p>");
            return;
        }

        $.each(data.results, function (index, job) {
            const jobCard = $("<div>").addClass("card mb-3 job-result");
            const cardBody = $("<div>").addClass("card-body");

            const jobTitle = $("<h4>").addClass("card-title").text(job.title);
            const company = $("<p>")
                .addClass("card-text company")
                .text(job.company.display_name);
            const location = $("<p>")
                .addClass("card-text location")
                .text(job.location.display_name);
            const contract = $("<p>")
                .addClass("card-text contract")
                .text(job.contract_type);

            cardBody.append(jobTitle, company, location, contract);
            jobCard.append(cardBody);
            jobResults.append(jobCard);
        });
    }

    // You can remove the form submission code since we're using regular form submission
});
