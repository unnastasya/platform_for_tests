"use client";
import { CriteriaType } from "@/types/lesson";
import { FormControlLabel, Switch } from "@mui/material";
import { Dispatch, SetStateAction, useState } from "react";

interface SelectComponentProps {
	criterion: CriteriaType;
	setCount: Dispatch<SetStateAction<number>>;
	setRaitingValue: Dispatch<SetStateAction<number>>;
	setSuccessCriterias: any;
}

export default function SelectComponent({
	criterion,
	setCount,
	setRaitingValue,
	setSuccessCriterias,
}: SelectComponentProps) {
	const [status, setStatus] = useState(false);

	const handleCriterionChange = (criterion: any) => {
		if (status) {
			setCount((prev: any) => prev - +criterion.value);
			setRaitingValue((prev: any) => prev - +criterion.value);
			setStatus((prev) => !prev);
			setSuccessCriterias((prev: any) =>
				prev.filter((el: any) => el._id !== criterion._id)
			);
		} else {
			setCount((prev: any) => prev + +criterion.value);
			setRaitingValue((prev: any) => prev + +criterion.value);
			setStatus((prev) => !prev);
			setSuccessCriterias((prev: any) => [...prev, criterion._id]);
		}
	};

	return (
		<FormControlLabel
			key={criterion._id}
			value={status}
			control={<Switch />}
			label={`${criterion.text} - ${criterion.value} балла`}
			onChange={() => handleCriterionChange(criterion)}
		/>
	);
}
