import { Grid, Rating, Tooltip } from "@mui/material";
import { Favorite } from "@mui/icons-material";

import { styled } from "@mui/material/styles";
import { HealthCheckRating } from "../types";

type BarProps = {
	rating: HealthCheckRating;
	showText: boolean;
};

const StyledRating = styled(Rating)({
	iconFilled: {
		color: "#ff6d75",
	},
	iconHover: {
		color: "#ff3d47",
	},
});

const HEALTHBAR_TEXTS = [
	"The patient is in great shape",
	"The patient has a low risk of getting sick",
	"The patient has a high risk of getting sick",
	"The patient has a diagnosed condition",
];

const HealthRatingBar = ({ rating, showText }: BarProps) => {
	return (
		<Grid className="health-bar" display="flex" gap={2}>
			<Tooltip title={HEALTHBAR_TEXTS[rating]}>
				<Grid display="flex" alignItems="center">
					<StyledRating
						readOnly
						value={4 - rating}
						max={4}
						icon={<Favorite fontSize="inherit" />}
						emptyIcon={
							<Favorite
								fontSize="inherit"
								style={{ opacity: 0.55 }}
							/>
						}
					/>
				</Grid>
			</Tooltip>

			{showText ? <p>{HEALTHBAR_TEXTS[rating]}</p> : null}
		</Grid>
	);
};

export default HealthRatingBar;
