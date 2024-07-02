import Translation from "@/src/application/lang/client/Translation";

type Props =
    | { status: "pending" }
    | { status: "error"; error: string }
    | {
          status: "success";
          newAuthorizationId: string;
      };

export default function useStage3(props: Props) {
    if (props.status === "pending") return [null];

    if (props.status === "error")
        return [
            <>
                <div>
                    <Translation
                        name="features.authorizations.newAuthorizationForm.summary.errorMsg"
                        variables={[props.error]}
                    />
                </div>
            </>,
        ] as [JSX.Element];

    return [
        <>
            <div>
                <Translation
                    name="features.authorizations.newAuthorizationForm.summary.success"
                    variables={[props.newAuthorizationId]}
                />
            </div>
        </>,
    ] as [JSX.Element];
}
