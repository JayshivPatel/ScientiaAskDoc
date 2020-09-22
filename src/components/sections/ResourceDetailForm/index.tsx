import React, { useEffect, useState } from "react"
import "react-datepicker/dist/react-datepicker.css"
import styles from "./style.module.scss"

import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Form from "react-bootstrap/Form"
import CreatableSelect from "react-select/creatable"
import DatePicker from "react-datepicker"

import { titleCase } from "utils/functions"
import { DEFAULT_CATEGORY } from "../../../constants/global"

interface ResourceDetailFormProps {
	id: number
	categories?: string[]
	tagList: string[]
	isLink: boolean
	defaultTitle?: string
	defaultURL?: string
	defaultCategory?: string
	defaultTags?: string[]
	defaultVisibleAfter?: Date
	titleDuplicated: (category: string, title: string) => boolean
	setResourceDetails: (details: ResourceDetails) => void
}

export interface ResourceDetails {
	title: string
	category: string
	tags: string[]
	visibleAfter?: Date
	url: string
}

interface Option {
	label: string
	value: string
}

const createOption = (label: string): Option => ({
	label,
	value: label,
})

const ResourceDetailForm: React.FC<ResourceDetailFormProps> = ({
	id,
	categories,
	tagList,
	isLink,
	defaultTitle,
	defaultURL,
	defaultCategory,
	defaultTags,
	defaultVisibleAfter,
	titleDuplicated,
	setResourceDetails,
}) => {
	const [categoryOptions, setCategoryOptions] = useState<Option[]>(
		(categories && categories.map(createOption)) || []
	)
	const [tagOptions, setTagOptions] = useState<Option[]>(
		tagList.map(createOption)
	)
	const [showPicker, setShowPicker] = useState(false)
	const [startDate, setStartDate] = useState(defaultVisibleAfter || new Date())

	const [title, setTitle] = useState<string>(defaultTitle || "")
	const [category, setCategory] = useState(defaultCategory || DEFAULT_CATEGORY)
	const [tags, setTags] = useState<string[]>(defaultTags || [])
	const [visibleAfter, setVisibleAfter] = useState<Date>()
	const [url, setURL] = useState(defaultURL || "")

	useEffect(() => {
		setResourceDetails({
			title,
			category,
			tags,
			visibleAfter,
			url,
		})
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [title, category, tags, visibleAfter, url])

	const datepicker = (
		<DatePicker
			selected={startDate}
			onChange={(date: Date) => {
				setStartDate(date)
				setVisibleAfter(date)
			}}
			showTimeInput
			timeFormat="HH:mm"
			dateFormat="MMMM d, yyyy HH:mm 'UTC'"
		/>
	)

	return (
		<>
			{isLink && (
				<Form.Group style={{ paddingTop: "20px" }}>
					<p className={styles.inputBarHeading}>URL</p>
					<Form.Control
						className={styles.inputBar}
						type="text"
						placeholder="Enter the URL"
						defaultValue={defaultURL}
						onChange={(event) => setURL(event.target.value)}
					/>
				</Form.Group>
			)}

			<Form.Group>
				<p className={styles.inputBarHeading}>Title</p>
				<Form.Control
					className={styles.inputBar}
					type="text"
					placeholder="Enter the Resource Title"
					defaultValue={defaultTitle}
					isInvalid={
						titleDuplicated(category, title) &&
						!(defaultCategory && title === defaultTitle)
					}
					onChange={(event) => setTitle(event.target.value)}
				/>
				<Form.Control.Feedback type="invalid">
					A resource with this title already exists under this category. Please
					choose a different title.
				</Form.Control.Feedback>
			</Form.Group>

			{categories && (
				<Form.Group>
					<p className={styles.inputBarHeading}>Category</p>
					<CreatableSelect
						className={styles.createableSelect}
						value={createOption(category)}
						options={categoryOptions}
						createOptionPosition="first"
						onCreateOption={(inputValue) => {
							let valueToCreate = titleCase(inputValue)
							setCategory(valueToCreate)
							setCategoryOptions([
								...categoryOptions,
								createOption(valueToCreate),
							])
						}}
						onChange={(selectedCategory) =>
							setCategory(
								selectedCategory ? (selectedCategory as Option).value : ""
							)
						}
					/>
					<p className={styles.mutedText}>
						Category cannot be changed afterwards. Automatically capitalized.
					</p>
				</Form.Group>
			)}

			<Form.Group>
				<p className={styles.inputBarHeading}>Tags</p>
				<CreatableSelect
					className={styles.createableSelect}
					value={tags.map(createOption)}
					isClearable
					isMulti
					isValidNewOption={(input) =>
						input !== "" &&
						!input.includes(";") &&
						input.toLowerCase() !== "new"
					}
					menuPortalTarget={document.body}
					styles={{ menuPortal: (styles) => ({ ...styles, zIndex: 10001 }) }}
					options={tagOptions}
					createOptionPosition="first"
					onCreateOption={(inputValue) => {
						let valueToCreate = inputValue.toLowerCase()
						setTags([...tags, valueToCreate])
						setTagOptions([...tagOptions, createOption(valueToCreate)])
					}}
					onChange={(selectedTags) =>
						setTags(
							selectedTags
								? (selectedTags as Option[]).map((option) => option.value)
								: []
						)
					}
				/>
				<p className={styles.mutedText}>
					Tags are lowercase and must not include semicolons. The "new" tag is
					automatically generated and cannot be manually added.
				</p>
			</Form.Group>

			<Form.Group>
				{defaultVisibleAfter ? (
					<Row>
						<Col md="auto">
							<Form.Label>Visible after</Form.Label>
						</Col>
						<Col>{datepicker}</Col>
					</Row>
				) : (
					<Row>
						<Col md="auto">
							<Form.Switch
								id={`${id}-visibilityPickerSwitch`}
								label={showPicker ? "Visible after" : "Visible immediately"}
								onClick={() => setShowPicker(!showPicker)}
								defaultChecked
							/>
						</Col>
						{showPicker && (
							<Col>
								{datepicker}
								<p className={styles.mutedText}>
									Course managers will still be able to view all "invisible"
									resources.
								</p>
							</Col>
						)}
					</Row>
				)}
			</Form.Group>
		</>
	)
}

export default ResourceDetailForm
