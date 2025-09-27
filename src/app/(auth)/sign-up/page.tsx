"use client";

import { CountrySelectField } from "@/components/forms/country-select-field";
import { FooterLink } from "@/components/forms/footer-link";
import { InputField } from "@/components/forms/input-field";
import { SelectField } from "@/components/forms/select-field";
import { Button } from "@/components/ui/button";
import { INVESTMENT_GOALS, PREFERRED_INDUSTRIES, RISK_TOLERANCE_OPTIONS } from "@/lib/constants";
import { useForm } from "react-hook-form";

const Page = () => {
	const {
		register,
		handleSubmit,
		control,
		formState: { errors, isSubmitting },
	} = useForm<SignUpFormData>({
		defaultValues: {
			fullName: "",
			email: "",
			password: "",
			country: "US",
			investmentGoals: "Growth",
			riskTolerance: "Medium",
			preferredIndustry: "Technology",
		},
		mode: "onBlur",
	});

	const onSubmit = async (data: SignUpFormData) => {
		try {
			console.log(data);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<>
			<h1 className="form-title">Sign Up & Personalize</h1>
			<form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
				<InputField
					name="fullName"
					label="Full Name"
					placeholder="John Doe"
					register={register}
					error={errors.fullName}
					validation={{ required: "Full name is required", minLength: 2 }}
				/>

				<InputField
					name="email"
					label="Email"
					placeholder="mail@example.com"
					register={register}
					error={errors.email}
					validation={{ required: "Email is required", pattern: /^\w+@\w+\.\w+$/, message: "Invalid email" }}
				/>

				<InputField
					name="password"
					label="Password"
					placeholder="********"
					type="password"
					register={register}
					error={errors.password}
					validation={{
						required: "Password is required",
						minLength: { value: 8, message: "Password must be at least 8 characters" },
					}}
				/>

				<CountrySelectField name="country" label="Country" control={control} error={errors.country} required />

				<SelectField
					name="investmentGoals"
					label="Investment Goals"
					placeholder="Select an investment goal"
					options={INVESTMENT_GOALS}
					control={control}
					error={errors.investmentGoals}
					required
				/>

				<SelectField
					name="riskTolerance"
					label="Risk Tolerance"
					placeholder="Select your risk level"
					options={RISK_TOLERANCE_OPTIONS}
					control={control}
					error={errors.riskTolerance}
					required
				/>

				<SelectField
					name="preferredIndustry"
					label="Preferred Industry"
					placeholder="Select your preferred industry"
					options={PREFERRED_INDUSTRIES}
					control={control}
					error={errors.preferredIndustry}
					required
				/>

				<Button type="submit" disabled={isSubmitting} className="yellow-btn w-full mt-5">
					{isSubmitting ? "Creating account" : "Start Your Investing Journey"}
				</Button>

				<FooterLink text="Already have an account?" href="/sign-in" linkText="Sign In" />
			</form>
		</>
	);
};

export default Page;
