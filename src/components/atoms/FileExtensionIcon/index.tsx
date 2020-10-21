import React, { useEffect, useState } from 'react'

import { 
  faFileAlt,
  faFilePdf, 
  faLink, 
  faFileCode, 
  faFileExcel, 
  faFilePowerpoint, 
  faFileVideo, 
  faFileWord,
  IconDefinition, 
  faFile
} from '@fortawesome/free-solid-svg-icons'
import { EnumDictionary } from 'constants/types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

enum FileCategory {
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
  [FileCategory.CODE]: [
    "c", "cpp", "h", "hpp", 
    "java", 
    "kt",
    "hs", "lhs",
    "sh",
    "py", 
  ],
  [FileCategory.EXCEL]: ["xls", "xlsx"],
  [FileCategory.LINK]: [],
  [FileCategory.PDF]: ["pdf"],
  [FileCategory.POWERPOINT]: ["ppt", "pptx"],
  [FileCategory.PLAIN_TEXT]: ["txt", ""],
  [FileCategory.VIDEO]: ["flv", "avi", "mp4"],
  [FileCategory.WORD]: ["doc", "docx"],
  [FileCategory.OTHER]: [],
}

const categoryIcons: EnumDictionary<FileCategory, IconDefinition> = {
  [FileCategory.CODE]: faFileCode,
  [FileCategory.EXCEL]: faFileExcel,
  [FileCategory.LINK]: faLink,
  [FileCategory.PDF]: faFilePdf,
  [FileCategory.POWERPOINT]: faFilePowerpoint,
  [FileCategory.PLAIN_TEXT]: faFileAlt,
  [FileCategory.VIDEO]: faFileVideo,
  [FileCategory.WORD]: faFileWord,
  [FileCategory.OTHER]: faFile,
}

const extensionDictionary: { [suffix: string]: FileCategory } = (() => {
  const dic: { [suffix: string]: FileCategory } = {}
  for (const key in categoryExtensions) {
    const value = categoryExtensions[key as FileCategory]
    value.forEach(extension => dic[extension] = key as FileCategory)
  }
  return dic
})()

interface Props {
  suffixes: string[]
  style?: React.CSSProperties
  onClick?: ((event: React.MouseEvent) => void)
}

const FileExtensionIcon: React.FC<Props> = ({ 
  suffixes,
  style,
  onClick,
}) => {

  const [category, setCategory] = useState<FileCategory>(FileCategory.OTHER)

  // Set icon as per suffixes' categories
  useEffect(() => {
    let category: FileCategory | undefined = undefined
    for (const suffix of suffixes) {
      const currentCategory = extensionDictionary[suffix] ?? FileCategory.OTHER
      if (category && (category !== currentCategory)) {
        setCategory(FileCategory.OTHER)
        return
      }
      category = currentCategory
    }
    setCategory(category ?? FileCategory.OTHER)
  }, [suffixes])
  
  return (
    <FontAwesomeIcon 
      style={style}
      icon={categoryIcons[category]}
      onClick={e => {
        e.stopPropagation()
        onClick?.(e)
      }}
      fixedWidth
    
    />
    )
}

export default FileExtensionIcon