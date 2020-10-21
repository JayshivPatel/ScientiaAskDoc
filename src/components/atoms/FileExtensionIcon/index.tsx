import React from 'react'

import { 
  faFileAlt,
  faFilePdf, 
  faLink, 
  faFileCode, 
  faFileExcel, 
  faFilePowerpoint, 
  faFileVideo, 
  faFileWord,
  IconDefinition 
} from '@fortawesome/free-solid-svg-icons'
import { EnumDictionary } from 'constants/types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const enum FileCategory {
  CODE = "code",
  EXCEL = "excel",
  LINK = "link",
  PDF = "pdf",
  PLAIN_TEXT = "plain text",
  POWERPOINT = "powerpoint",
  VIDEO = "video",
  WORD = "word",
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
  [FileCategory.LINK]: [""],
  [FileCategory.PDF]: ["pdf"],
  [FileCategory.POWERPOINT]: ["ppt", "pptx"],
  [FileCategory.PLAIN_TEXT]: ["txt"],
  [FileCategory.VIDEO]: ["flv", "avi", "mp4"],
  [FileCategory.WORD]: ["doc", "docx"],
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
  const category = suffixes.length === 1 
    ? extensionDictionary[suffixes[0]] ?? FileCategory.PLAIN_TEXT
    : FileCategory.PLAIN_TEXT
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