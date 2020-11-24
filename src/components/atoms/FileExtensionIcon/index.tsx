import React, { useEffect, useState } from "react";

import {
  faArchive,
  faFile,
  faFileAlt,
  faFileCode,
  faFileExcel,
  faFilePdf,
  faFilePowerpoint,
  faFileVideo,
  faFileWord,
  faLink,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import { EnumDictionary } from "constants/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

enum FileCategory {
  ARCHIVE = "archive",
  CODE = "code",
  EXCEL = "excel",
  LINK = "link",
  PDF = "pdf",
  PLAIN_TEXT = "plain text",
  POWERPOINT = "powerpoint",
  VIDEO = "video",
  WORD = "word",
  OTHER = "other",
}

const categoryExtensions: EnumDictionary<FileCategory, string[]> = {
  [FileCategory.ARCHIVE]: [
    "zip",
    "7z",
    "rar",
    "tar",
    "tgz",
    "taz",
    "gz",
    "jar",
    "jar",
  ],
  [FileCategory.CODE]: [
    // c, c++
    "c",
    "cc",
    "cpp",
    "cxx",
    "c++",
    "h",
    "hpp",
    "hh",
    // java
    "j",
    "jav",
    "java",
    "class",
    // kotlin
    "kt",
    // haskell
    "hs",
    "lhs",
    // prolog
    "pl",
    "pro",
    "P",
    // shell script
    "sh",
    "csh",
    // ruby
    "rb",
    "rbw",
    // lua,
    "lua",
    // python
    "py",
    "pyc",
    "pyo",
    "pyd",
    // perl,
    "pl",
    "pm",
    // julia
    "jl",
    // matlab
    "m",
    // R
    "R",
    // javascript, typescript
    "js",
    "ts",
    "jsx",
    "tsx",
    // php,
    "php",
    // standard ml
    "sml",
    // scheme, racket
    "scm",
    "sch",
    "ss",
    "rkt",
    // scala,
    "scala",
    // ocaml
    "ml",
    "mli",
    // erlang, elixir
    "erl",
    "ex",
    "exs",
    // rust,
    "rs",
    // swift
    "swift",
    // go
    "go",
    // fortran
    "f",
    "for",
    "f90",
    // sql
    "sql",
    // css, sass, scss
    "css",
    "sass",
    "scss",
    // json
    "json",
    // xml
    "xml",
    // yaml
    "yaml",
    "yml",
  ],
  [FileCategory.EXCEL]: ["xls", "xlsx"],
  [FileCategory.LINK]: [],
  [FileCategory.PDF]: ["pdf"],
  [FileCategory.POWERPOINT]: ["ppt", "pptx"],
  [FileCategory.PLAIN_TEXT]: ["txt", ""],
  [FileCategory.VIDEO]: ["flv", "avi", "mp4"],
  [FileCategory.WORD]: ["doc", "docx"],
  [FileCategory.OTHER]: [],
};

const categoryIcons: EnumDictionary<FileCategory, IconDefinition> = {
  [FileCategory.ARCHIVE]: faArchive,
  [FileCategory.CODE]: faFileCode,
  [FileCategory.EXCEL]: faFileExcel,
  [FileCategory.LINK]: faLink,
  [FileCategory.PDF]: faFilePdf,
  [FileCategory.POWERPOINT]: faFilePowerpoint,
  [FileCategory.PLAIN_TEXT]: faFileAlt,
  [FileCategory.VIDEO]: faFileVideo,
  [FileCategory.WORD]: faFileWord,
  [FileCategory.OTHER]: faFile,
};

const extensionDictionary: { [suffix: string]: FileCategory } = (() => {
  const dic: { [suffix: string]: FileCategory } = {};
  for (const key in categoryExtensions) {
    const value = categoryExtensions[key as FileCategory];
    value.forEach((extension) => (dic[extension] = key as FileCategory));
  }
  return dic;
})();

interface Props {
  suffixes: string[];
  style?: React.CSSProperties;
  onClick?: (event: React.MouseEvent) => void;
}

const FileExtensionIcon: React.FC<Props> = ({ suffixes, style, onClick }) => {
  const [category, setCategory] = useState<FileCategory>(FileCategory.OTHER);

  // Set icon as per suffixes' categories
  useEffect(() => {
    let category: FileCategory | undefined = undefined;
    for (const suffix of suffixes) {
      const currentCategory = extensionDictionary[suffix] ?? FileCategory.OTHER;
      if (category && category !== currentCategory) {
        setCategory(FileCategory.OTHER);
        return;
      }
      category = currentCategory;
    }
    setCategory(category ?? FileCategory.OTHER);
  }, [suffixes]);

  return (
    <FontAwesomeIcon
      style={style}
      icon={categoryIcons[category]}
      onClick={(e) => {
        e.stopPropagation();
        onClick?.(e);
      }}
      fixedWidth
    />
  );
};

export default FileExtensionIcon;
