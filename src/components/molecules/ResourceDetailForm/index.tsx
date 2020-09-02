import React, { useEffect, useState } from "react";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import CreatableSelect from "react-select/creatable";
import DatePicker, { registerLocale } from "react-datepicker";
import { ResourceDetails } from "../../pages/ModuleResources/components/UploadModal"

import "react-datepicker/dist/react-datepicker.css";
import enGB from "date-fns/locale/en-GB";
registerLocale("en-GB", enGB);


interface ResourceDetailFormProps {
	id: number;
	categories: string[];
	tagList: string[];
	defaultTitle?: string;
	setResourceDetails: (id: number, details: ResourceDetails) => void;
}

interface Option {
	label: string;
	value: string;
}

const ResourceDetailForm: React.FC<ResourceDetailFormProps> = ({
	id,
	categories,
	tagList,
	defaultTitle,
	setResourceDetails,
}) => {
	const [showPicker, setShowPicker] = useState(false);
	const [startDate, setStartDate] = useState(new Date());

	const [title, setTitle] = useState<string>(defaultTitle || "");
	const [category, setCategory] = useState(categories[0] || "");
	const [tags, setTags] = useState<string[]>([]);
	const [visibleAfter, setVisibleAfter] = useState("");

	useEffect(() => {
		setResourceDetails(id, {
			title,
			category,
			tags,
			visibleAfter
		})
	}, [id, title, category, tags, visibleAfter, setResourceDetails])

	return (<>
		<Form.Group>
			<Form.Label>Title</Form.Label>
			<Form.Control
				type="text"
				placeholder="Type a title for this resource here."
				defaultValue={defaultTitle}
				onChange={event => setTitle(event.target.value)}
			/>
		</Form.Group>

		<Form.Group>
			<Form.Label>Category</Form.Label>
			<CreatableSelect
				defaultValue={{
					value: categories[0],
					label: categories[0],
				}}
				options={categories.map(category => ({
					value: category,
					label: category,
				}))}
				onChange={selectedCategory => setCategory(selectedCategory ? (selectedCategory as Option).value : "")}
			/>
		</Form.Group>

		<Form.Group>
			<Form.Label>Tags</Form.Label>
			<CreatableSelect
				isClearable
				isMulti
				menuPortalTarget={document.body}
				styles={{ menuPortal: styles => ({ ...styles, zIndex: 10001 })}}
				options={tagList.map(tag => ({
					value: tag,
					label: tag,
				}))}
				onChange={selectedTags => setTags(selectedTags ? (selectedTags as Option[]).map(option => option.value) : [])}
			/>
		</Form.Group>

		<Form.Group>
			<Row>
				<Col md="auto">
					<Form.Switch
						id={`${id}-visibilityPickerSwitch`}
						label={showPicker ? "Visible after" : "Visible immediately"}
						onClick={() => setShowPicker(!showPicker)}
						defaultChecked
					/>
				</Col>
				{showPicker &&
				<Col>
					<DatePicker
						selected={startDate}
						onChange={(date: Date) => setStartDate(date)}
						onChangeRaw={event => setVisibleAfter(event.target.value)}
						locale="en-GB"
						showTimeInput
						dateFormat="dd/MM/yyyy hh:mm"
					/>
				</Col>}
			</Row>
  		</Form.Group>
	</>);
};

export default ResourceDetailForm;