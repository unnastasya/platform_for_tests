import { useRouter } from "next/navigation";
import styles from "./AddClassBlock.module.css";
import { useForm } from "react-hook-form";
import { Divider, Paper } from "@mui/material";
import { addClass } from "@/api/classes";
import AddClassHeader from "../AddClassHeader/AddClassHeader";
import AddStudents from "../AddStudents/AddStudents";

export default function AddClassBlock() {
	const router = useRouter();

	const {
		register,
		formState: { errors },
		handleSubmit,
		control,
	} = useForm({
		defaultValues: {
			school: "",
			class: "",
			people: [
				{
					name: "",
					surname: "",
				},
			],
		},
	});

	const onSubmit = async (data: any) => {
		await addClass(data);
		router.push("/classes");
	};

	return (
		<Paper className={styles.addClass__container}>
			<form
				className={styles.addClass__form}
				onSubmit={handleSubmit((data) => {
					onSubmit(data);
				})}
			>
				<AddClassHeader register={register} />

				<Divider />
				<AddStudents control={control} register={register} />
			</form>
		</Paper>
	);
}
