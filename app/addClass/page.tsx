"use client";
import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";

import { useCallback, useEffect } from "react";

import { useRouter } from "next/navigation";

import AddClassBlock from "@/components/AddClassBlock/AddClassBlock";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import {
	AddClassActions,
	addClassIsLoadingSelector,
	addClassUsersDataSelector,
	classIsAddedSelector,
	editClassDataSelector,
	editClassIdDataSelector,
} from "@/redux/Class/AddClass";
import { activeUserIdSelector } from "@/redux/Auth";

import { ClassSchema } from "@/components/AddClassBlock/ClassSchema";

import { Page } from "@/components/Page/Page";

export default function AddClassPage() {
	const dispatch = useAppDispatch();
	const router = useRouter();

	const editClassData = useAppSelector(editClassDataSelector || null);
	const activeUserId = useAppSelector(activeUserIdSelector);
	const editClassId = useAppSelector(editClassIdDataSelector || null);
	const isLoading = useAppSelector(addClassIsLoadingSelector);
	const studentsData = useAppSelector(addClassUsersDataSelector);
	const isAddedClass = useAppSelector(classIsAddedSelector);

	const changeRequestData = (data: any): any => {
		dispatch(AddClassActions.changeRequestData(data));
	};

	const fetchAddClass = useCallback(() => {
		dispatch(AddClassActions.addClass());
	}, [dispatch]);

	const {
		register,
		formState: { errors },
		handleSubmit,
		control,
	} = useForm({
		defaultValues: {
			school: editClassData?.school || "",
			class: editClassData?.class || "",
			people: editClassData?.students || [
				{
					name: "",
					surname: "",
				},
			],
			authorId: editClassData?.authorId || activeUserId,
		},
		resolver: yupResolver(ClassSchema),
	});

	const onSubmit = (data: any) => {
		const value = { ...data };

		if (editClassId) {
			changeRequestData(value);
			dispatch(AddClassActions.editClass());
		} else {
			changeRequestData(value);
			fetchAddClass();
		}
	};

	const routingToClasses = useCallback(() => {
		dispatch(AddClassActions.changeIsAddedClass(false));
		dispatch(AddClassActions.changeClassIsAddedToFalse());
		router.push("/classes");
	}, [dispatch, router]);

	useEffect(() => {
		if (isAddedClass && studentsData.length == 0) {
			routingToClasses();
		}
	}, [routingToClasses, studentsData, isAddedClass]);

	return (
		<Page>
			<AddClassBlock
				handleSubmit={handleSubmit}
				onSubmit={onSubmit}
				errors={errors}
				control={control}
				register={register}
				isLoading={isLoading}
				isAddedClass={isAddedClass}
				studentsData={studentsData}
				routingToClasses={routingToClasses}
			/>
		</Page>
	);
}
