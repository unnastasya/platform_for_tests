export type User = {
	_id: string;
	name: string;
	surname: string;
	role: "teacher" | "student";
};

export type AddUserType = {
	fullName: string;
	login: string;
	password: string;
};
