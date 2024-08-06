export const getTranslations = (language: string) => {
  switch (language) {
    case "sl":
      return {
        title: "Potrditev",
        description: "Ali ste prepričani, da želite poslati?",
        confirmText: "Potrdi",
        submitButtonText: "Pošlji",
        cancelText: "Prekliči",
        disclaimerTitle: "Dobrodošli v naši storitvi!",
        disclaimerDescription: `Omejitev odgovornosti: Vsi podatki, ki jih vnesete v ta program, so lahko vidni pooblaščenim osebam za namen zagotavljanja pravilnega delovanja, vzdrževanja in podpore programa. Vaši vneseni podatki so lahko pregledani in urejeni s strani pooblaščenih oseb za odpravljanje napak, izboljšanje natančnosti programa ali izboljšanje splošne uporabniške izkušnje. To lahko vključuje, vendar ni omejeno na, spreminjanje vnosov za jasnost, popravljanje netočnosti ali standardizacijo formatov. Čeprav izvajamo razumne ukrepe za zaščito vaših vnesenih podatkov, ne moremo zagotoviti popolne varnosti. Izogibajte se vnosu občutljivih osebnih podatkov ali zaupnih podatkov, razen če je to nujno potrebno. Vi ste odgovorni za zagotavljanje, da so vsi vneseni podatki točni in primerni za predvideno uporabo programa. Zloraba programa, vključno z vnosom zlonamernih ali neprimernih podatkov, je strogo prepovedana in lahko povzroči prekinitev dostopa. Z nadaljevanjem uporabe tega programa se strinjate s pregledom, spreminjanjem in uporabo vaših vnesenih podatkov, kot je opisano v tej omejitvi odgovornosti. Če se ne strinjate s temi pogoji, takoj prenehajte uporabljati program.`,
        disclaimerConfirmText: "Sprejmi",
        disclaimerCancelText: "Zavrni",
        helpTitle: "Pomoč",
        helpDescription: "Za kakršno koli pomoč nas kontaktirajte na:",
        helpCloseText: "Zapri",
        welcomeText: "Dobrodošli",
        answerText:
          "Odgovorite na naslednja vprašanja, izberite eno osebo za vsako.",
        successMessage: "Hvala! Vaš obrazec je bil uspešno poslan.",
      };
    case "hr":
      return {
        title: "Potvrda",
        description: "Jeste li sigurni da želite poslati?",
        confirmText: "Potvrdi",
        submitButtonText: "Pošalji",
        cancelText: "Odustani",
        disclaimerTitle: "Dobrodošli u našu uslugu!",
        disclaimerDescription: `Odricanje od odgovornosti: Svi podaci koje unesete u ovaj program mogu biti vidljivi ovlaštenom osoblju u svrhu osiguravanja pravilnog funkcioniranja, održavanja i podrške programa. Vaši uneseni podaci mogu biti pregledani i uređeni od strane ovlaštenog osoblja radi ispravljanja pogrešaka, poboljšanja točnosti programa ili poboljšanja ukupnog korisničkog iskustva. To može uključivati, ali nije ograničeno na, izmjenu unosa radi jasnoće, ispravljanje netočnosti ili standardizaciju formata. Iako provodimo razumne mjere za zaštitu vaših unesenih podataka, ne možemo jamčiti potpunu sigurnost. Trebali biste izbjegavati unos osjetljivih osobnih podataka ili povjerljivih podataka osim ako to nije apsolutno potrebno. Vi ste odgovorni za osiguravanje da su svi uneseni podaci točni i prikladni za predviđenu upotrebu programa. Zlouporaba programa, uključujući unos zlonamjernih ili neprikladnih podataka, strogo je zabranjena i može rezultirati prekidom pristupa. Nastavkom korištenja ovog programa pristajete na pregled, izmjenu i korištenje vaših unesenih podataka kako je opisano u ovom odricanju od odgovornosti. Ako se ne slažete s ovim uvjetima, odmah prestanite koristiti program.`,
        disclaimerConfirmText: "Prihvati",
        disclaimerCancelText: "Odbij",
        helpTitle: "Pomoć",
        helpDescription: "Za bilo kakvu pomoć kontaktirajte nas na:",
        helpCloseText: "Zatvori",
        welcomeText: "Dobrodošli",
        answerText:
          "Odgovorite na sljedeća pitanja, odaberite jednu osobu za svako.",
        successMessage: "Hvala! Vaš obrazac je uspješno poslan.",
      };
    case "de":
      return {
        title: "Bestätigung",
        description: "Sind Sie sicher, dass Sie senden möchten?",
        confirmText: "Bestätigen",
        submitButtonText: "Senden",
        cancelText: "Abbrechen",
        disclaimerTitle: "Willkommen bei unserem Service!",
        disclaimerDescription: `Haftungsausschluss: Alle Daten, die Sie in dieses Programm eingeben, können von autorisiertem Personal eingesehen werden, um die ordnungsgemäße Funktion, Wartung und Unterstützung des Programms zu gewährleisten. Ihre eingegebenen Daten können von autorisiertem Personal überprüft und bearbeitet werden, um Fehler zu korrigieren, die Genauigkeit des Programms zu verbessern oder das allgemeine Benutzererlebnis zu verbessern. Dies kann unter anderem die Änderung von Einträgen zur Klarstellung, die Korrektur von Ungenauigkeiten oder die Standardisierung von Formaten umfassen. Obwohl wir angemessene Maßnahmen zum Schutz Ihrer eingegebenen Daten ergreifen, können wir keine absolute Sicherheit garantieren. Sie sollten vermeiden, sensible persönliche Informationen oder vertrauliche Daten einzugeben, es sei denn, dies ist unbedingt erforderlich. Sie sind dafür verantwortlich, sicherzustellen, dass alle eingegebenen Daten korrekt und für den vorgesehenen Zweck des Programms geeignet sind. Missbrauch des Programms, einschließlich der Eingabe bösartiger oder unangemessener Daten, ist strengstens untersagt und kann zur Beendigung des Zugriffs führen. Durch die weitere Nutzung dieses Programms stimmen Sie der Überprüfung, Änderung und Nutzung Ihrer eingegebenen Daten wie in diesem Haftungsausschluss beschrieben zu. Wenn Sie diesen Bedingungen nicht zustimmen, stellen Sie die Nutzung des Programms sofort ein.`,
        disclaimerConfirmText: "Akzeptieren",
        disclaimerCancelText: "Ablehnen",
        helpTitle: "Hilfe",
        helpDescription: "Für jegliche Hilfe kontaktieren Sie uns bitte unter:",
        helpCloseText: "Schließen",
        welcomeText: "Willkommen",
        answerText:
          "Beantworten Sie die folgenden Fragen und wählen Sie für jede eine Person aus.",
        successMessage: "Danke! Ihr Formular wurde erfolgreich eingereicht.",
      };
    case "en":
    default:
      return {
        title: "Confirmation",
        description: "Are you sure you want to submit?",
        confirmText: "Confirm",
        submitButtonText: "Submit",
        cancelText: "Cancel",
        disclaimerTitle: "Welcome to Our Service!",
        disclaimerDescription: `Disclaimer: Any data you input into this program may be visible to authorized personnel for the purpose of ensuring proper functionality, maintenance, and support of the program. Your input data may be reviewed and edited by authorized personnel to correct errors, improve program accuracy, or enhance overall user experience. This may include, but is not limited to, modifying entries for clarity, correcting inaccuracies, or standardizing formats. While we implement reasonable measures to protect your input data, we cannot guarantee absolute security. You should avoid entering sensitive personal information or confidential data unless absolutely necessary. You are responsible for ensuring that any data you input is accurate and appropriate for the intended use of the program. Misuse of the program, including the entry of malicious or inappropriate data, is strictly prohibited and may result in termination of access. By continuing to use this program, you consent to the review, modification, and use of your input data as described in this disclaimer. If you do not agree with these terms, please discontinue use of the program immediately.`,
        disclaimerConfirmText: "Accept",
        disclaimerCancelText: "Reject",
        helpTitle: "Help",
        helpDescription: "For any assistance, please contact us at:",
        helpCloseText: "Close",
        welcomeText: "Welcome",
        answerText:
          "Answer the following questions, choosing one person for each.",
        successMessage: "Thank you! Your form has been successfully submitted.",
      };
  }
};
