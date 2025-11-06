"use client";
import { useEffect, useState } from "react";
import { FormControl, Select, MenuItem, InputLabel } from "@mui/material";

declare global {
    interface Window {
        googleTranslateElementInit?: () => void;
        google?: any;
    }
}

const languages = [
    { code: "en", label: "English" },
    // { code: "hi", label: "Hindi" },
    // { code: "fr", label: "French" },
    { code: "ar", label: "Arabic" }, // Dubai
];

const GoogleTranslateMUI = () => {
    const [currentLang, setCurrentLang] = useState("en");

    useEffect(() => {
        // Load Google Translate
        const script = document.createElement("script");
        script.src =
            "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
        script.async = true;
        document.body.appendChild(script);

        // Initialize Google Translate
        window.googleTranslateElementInit = () => {
            new window.google.translate.TranslateElement(
                {
                    pageLanguage: "en",
                    includedLanguages: languages.map((l) => l.code).join(","),
                    layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
                },
                "google_translate_element"
            );
        };

        // Load current language from cookie
        const match = document.cookie.match(/googtrans=\/en\/([a-z]{2})/);
        if (match) setCurrentLang(match[1]);
    }, []);

    const handleChange = (event: any) => {
        const langCode = event.target.value;
        setCurrentLang(langCode);

        // Set cookie for Google Translate
        document.cookie = `googtrans=/en/${langCode}; path=/`;
        document.cookie = `googtrans=/en/${langCode}; domain=${window.location.hostname}; path=/`;

        // Reload page to apply translation
        window.location.reload();
    };

    return (
        <FormControl size="small" variant="outlined" sx={{ minWidth: 140 }}>
            <InputLabel>Language</InputLabel>
            <Select value={currentLang} label="Language" onChange={handleChange}>
                {languages.map((lang) => (
                    <MenuItem key={lang.code} value={lang.code}>
                        {lang.label}
                    </MenuItem>
                ))}
            </Select>

            {/* Hidden Google Translate widget */}
            <div id="google_translate_element" style={{ display: "none" }} />
        </FormControl>
    );
};

export default GoogleTranslateMUI;
