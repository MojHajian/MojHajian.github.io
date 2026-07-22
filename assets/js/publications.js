/* =========================================================
   Publications — data + rendering + theme filtering
   Data is inline (single source of truth) so the page works
   both when opened locally (file://) and when deployed.
   To add a paper: copy an entry and edit. Newest first.
   themes: "bigdata" | "medical" | "neuro"  (one or more)
   status: "published" | "submitted" | "in-progress"
   pdf:    path string, or null when not yet available
   ========================================================= */
const SCHOLAR = "https://scholar.google.com/citations?hl=en&user=DYunodoAAAAJ";

const PUBLICATIONS = [
  {
    title: "Decoding Neural Dynamics of Suspense: EEG Connectivity and Power Analysis with Machine Learning for Pre- and Post-Suspense State Classification",
    authors: "Mojtaba Hajian, Somayeh Khosravi Khorashad, Sepideh Khoneiveh, Reza Khosrowabadi",
    venue: "Applied Soft Computing",
    year: 2026, type: "Journal", status: "in-progress", themes: ["neuro"], pdf: null
  },
  {
    title: "Multidimensional Clustering over Big Data: Models, Issues, Analysis, Emerging Trends",
    authors: "Alfredo Cuzzocrea, Mojtaba Hajian",
    venue: "Journal of Big Data, Springer",
    year: 2026, type: "Journal", status: "submitted", themes: ["bigdata"], pdf: null
  },
  {
    title: "Data Cube Compression at Work! Effective and Efficient OLAP over Big Datasets in Mobile Cloud Environments",
    authors: "Alfredo Cuzzocrea, Mojtaba Hajian",
    venue: "Information Systems",
    year: 2026, type: "Journal", status: "in-progress", themes: ["bigdata"], pdf: null
  },
  {
    title: "ClassCube: Effective and Efficient Big OLAP Data Cube Classification via Dimensionality Reduction",
    authors: "Alfredo Cuzzocrea, Mojtaba Hajian",
    venue: "ICEIS",
    year: 2024, type: "Conference", status: "published", themes: ["bigdata"],
    pdf: "files/publications/classcube-iceis2024.pdf"
  },
  {
    title: "MALAGA — MultidimensionAL Big DAta Analytics over Massive Graph DAta",
    authors: "Alfredo Cuzzocrea, Mojtaba Hajian, Abderraouf Hafsaoui",
    venue: "IEEE International Conference on Big Data, Washington DC, USA",
    year: 2024, type: "Conference", status: "published", themes: ["bigdata"],
    pdf: "files/publications/malaga-graph-bigdata2024.pdf"
  },
  {
    title: "Experimental Analysis and Assessment of a Real-Life Cloud Mobile Big OLAP System Enhanced with Compression and Approximation Paradigms",
    authors: "Alfredo Cuzzocrea, Mojtaba Hajian",
    venue: "IEEE International Conference on Big Data, Washington DC, USA",
    year: 2024, type: "Conference", status: "published", themes: ["bigdata"],
    pdf: "files/publications/experimental-analysis-mobile-olap-bigdata2024.pdf"
  },
  {
    title: "Compressing Big OLAP Data Cubes over Mobile Clouds: A Hierarchy-Based Data Partitioning Approach",
    authors: "Alfredo Cuzzocrea, Mojtaba Hajian, Abderraouf Hafsaoui",
    venue: "32nd Symposium of Advanced Database Systems (SEBD), Villasimius, Italy",
    year: 2024, type: "Conference", status: "published", themes: ["bigdata"],
    pdf: "files/publications/compressing-olap-mobile-clouds-sebd2024.pdf"
  },
  {
    title: "Effective and Efficient Big OLAP Data Cube Compression in Mobile Cloud Environments: The IQTS Algorithm",
    authors: "Alfredo Cuzzocrea, Mojtaba Hajian",
    venue: "IEEE International Conference on Big Data, Sorrento, Italy",
    year: 2023, type: "Conference", status: "published", themes: ["bigdata"],
    pdf: "files/publications/iqts-olap-compression-bigdata2023.pdf"
  },
  {
    title: "A Theoretical Framework for Supporting Clustering Validation via Non-Negative-Matrix-Factorization Trace Sequences Over Probabilistic Spaces",
    authors: "Alfredo Cuzzocrea, Pablo Figuera, Mojtaba Hajian, Pablo García Bringas",
    venue: "IEEE Conf. on Cloud and Big Data Computing (CBDCom), Abu Dhabi, UAE",
    year: 2023, type: "Conference", status: "published", themes: ["bigdata"],
    pdf: "files/publications/nmf-clustering-validation-cbdcom2023.pdf"
  },
  {
    title: "Decoupage Parameters Related to the Suspense Points and Symmetrical Activation of Brain Waves at the Frontal Lobe: An EEG Study of the Movie ‘Psycho’",
    authors: "Somayeh Khosravi Khorashad, Sepideh Khoneiveh, Mojtaba Hajian, Reza Khosrowabadi",
    venue: "Quarterly Review of Film and Video",
    year: 2022, type: "Journal", status: "published", themes: ["neuro"],
    pdf: "files/publications/psycho-eeg-suspense-qrfv2022.pdf"
  },
  {
    title: "Effectively and Efficiently Supporting Predictive Big Data Analytics over Open Big Data in the Transportation Sector: A Bayesian Network Framework",
    authors: "Alfredo Cuzzocrea, Carson Leung, Mojtaba Hajian, Marshall Jackson",
    venue: "8th IEEE Conf. on Cloud and Big Data Computing (CBDCom), Calabria, Italy",
    year: 2022, type: "Conference", status: "published", themes: ["bigdata"],
    pdf: "files/publications/bayesian-transport-analytics-cbdcom2022.pdf"
  },
  {
    title: "Risk Analysis for Unsupervised Privacy-Preserving Tools",
    authors: "Alfredo Cuzzocrea, Christophe Cerisara, Mojtaba Hajian",
    venue: "30th Italian Symposium on Advanced Database Systems (SEBD), Pisa, Italy",
    year: 2022, type: "Conference", status: "published", themes: ["bigdata"],
    pdf: "files/publications/risk-analysis-privacy-sebd2022.pdf"
  },
  {
    title: "Discrimination of Depression Levels Using Machine Learning Methods on EEG Signals",
    authors: "Yousef Mohammadi, Mojtaba Hajian, Mohammad Hassan Moradi",
    venue: "27th Iranian Conference on Electrical Engineering (ICEE), Yazd, Iran",
    year: 2019, type: "Conference", status: "published", themes: ["neuro", "medical"],
    pdf: "files/publications/depression-levels-eeg-icee2019.pdf"
  },
  {
    title: "Quantification of Depression Disorder Using EEG Signal",
    authors: "Mojtaba Hajian, Mohammad Hassan Moradi",
    venue: "24th Nat. & 2nd Int. Iranian Conf. on Biomedical Engineering (ICBME), Tehran, Iran",
    year: 2017, type: "Conference", status: "published", themes: ["neuro", "medical"],
    pdf: "files/publications/depression-quantification-eeg-icbme2017.pdf"
  }
];

(function () {
  const list = document.getElementById("pubList");
  const empty = document.getElementById("pubEmpty");
  const filters = document.querySelectorAll(".filter");
  if (!list) return;

  const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const boldName = (authors) =>
    esc(authors).replace(/(M(?:ojtaba)?\.?\s*Hajian)/g, "<strong>$1</strong>");

  const statusLabel = { submitted: "Submitted", "in-progress": "In progress" };

  function render(filter) {
    const items = PUBLICATIONS.filter((p) => filter === "all" || p.themes.includes(filter));
    list.innerHTML = items
      .map((p) => {
        const links = [];
        if (p.pdf) links.push(`<a class="pub__link pub__link--pdf" href="${p.pdf}" target="_blank" rel="noopener">PDF</a>`);
        links.push(`<a class="pub__link" href="${SCHOLAR}" target="_blank" rel="noopener">Scholar</a>`);

        const status =
          p.status && p.status !== "published"
            ? `<span class="pub__status pub__status--${p.status}">${statusLabel[p.status] || p.status}</span>`
            : "";

        return `
        <li class="pub" data-themes="${p.themes.join(" ")}">
          <span class="pub__year mono">${p.year}</span>
          <div class="pub__main">
            <p class="pub__title">${esc(p.title)}</p>
            <p class="pub__authors">${boldName(p.authors)}</p>
            <p class="pub__venue">
              <span class="pub__badge pub__badge--type">${p.type}</span>
              <span>${esc(p.venue)}</span>
              ${status}
            </p>
          </div>
          <div class="pub__links">${links.join("")}</div>
        </li>`;
      })
      .join("");

    if (empty) empty.hidden = items.length !== 0;
  }

  filters.forEach((btn) => {
    btn.addEventListener("click", () => {
      filters.forEach((b) => {
        b.classList.remove("is-active");
        b.setAttribute("aria-selected", "false");
      });
      btn.classList.add("is-active");
      btn.setAttribute("aria-selected", "true");
      render(btn.dataset.filter);
    });
  });

  render("all");
})();
