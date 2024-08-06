import React, { useContext, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { getTranslations } from "@/helpers/translations";
import { LanguageDataContext } from "@/context/LanguageDataContext";

export function HelpDialog() {
  const { languageData, setLanguageData } = useContext(LanguageDataContext);
  const [translations, setTranslations] = useState(
    getTranslations(languageData)
  );

  useEffect(() => {
    const newTranslations = getTranslations(languageData);
    setTranslations(newTranslations);
  }, [languageData]);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex items-center pr-4 py-2 font-semibold rounded-md gap-x-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            className="bi bi-question-circle"
            viewBox="0 0 16 16"
          >
            <path d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 1 8 0a8 8 0 0 1 0 16z" />
            <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.054-1.168 1.775v.088c0 .128.113.232.25.232h.825c.138 0 .25-.104.25-.232v-.088c0-.408.205-.667.965-1.206.545-.386 1.314-.927 1.314-2.054 0-1.346-1.314-2.342-2.927-2.342-1.7 0-2.713 1.168-2.774 2.527zM8 12a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1z" />
          </svg>
          <h1 className="hidden md:block font-bold text-primary">Help</h1>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{translations.helpTitle}</DialogTitle>
          <DialogDescription>{translations.helpDescription}</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-1 items-center gap-4">
            <p>Mikro Graf Art d.o.o.</p>
            <p>Archinetova 7, SI-1000 Ljubljana</p>
            <p>Email: slavc.zust@mga.si</p>
            <p>Phone: +386 41 782 099</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
