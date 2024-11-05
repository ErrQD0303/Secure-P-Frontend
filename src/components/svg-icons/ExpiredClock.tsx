import { SVGProps } from "react";

const ExpiredClock = (
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) => {
  return (
    <svg
      width="13"
      height="16"
      viewBox="0 0 13 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0_51_30)">
        <path
          d="M6.25536 2.32831H5.48736V5.52319H3.39201V6.29119H6.25536V2.32831Z"
          fill="currentColor"
        />
        <path
          d="M11.2064 6.80576C11.4181 5.65541 11.2564 4.46751 10.7449 3.41559C10.2334 2.36368 9.39901 1.50288 8.36352 0.958929C7.32802 0.414982 6.14573 0.216396 4.98934 0.39218C3.83296 0.567964 2.76308 1.10891 1.936 1.93599C1.10892 2.76307 0.567979 3.83295 0.392195 4.98933C0.216411 6.14571 0.414998 7.32801 0.958945 8.3635C1.50289 9.39899 2.3637 10.2334 3.41561 10.7449C4.46752 11.2564 5.65542 11.4181 6.80578 11.2064C7.0754 11.5686 7.41985 11.8685 7.81572 12.0857C8.21159 12.3029 8.64959 12.4324 9.09994 12.4652C9.55029 12.498 10.0024 12.4335 10.4256 12.276C10.8488 12.1184 11.2331 11.8717 11.5524 11.5524C11.8717 11.2331 12.1185 10.8488 12.276 10.4256C12.4335 10.0024 12.498 9.55027 12.4652 9.09992C12.4324 8.64957 12.303 8.21157 12.0857 7.8157C11.8685 7.41984 11.5686 7.07538 11.2064 6.80576ZM5.81378 10.5293C4.88114 10.5293 3.96944 10.2527 3.19398 9.73457C2.41851 9.21643 1.81411 8.47996 1.45721 7.61831C1.1003 6.75667 1.00692 5.80853 1.18887 4.89381C1.37081 3.97909 1.81992 3.13886 2.4794 2.47939C3.13888 1.81991 3.9791 1.3708 4.89383 1.18885C5.80855 1.0069 6.75668 1.10028 7.61833 1.45719C8.47998 1.8141 9.21644 2.4185 9.73459 3.19396C10.2527 3.96942 10.5293 4.88112 10.5293 5.81376C10.5302 6.00967 10.5191 6.20546 10.496 6.4C9.92332 6.16724 9.2947 6.10849 8.68878 6.23111C8.08287 6.35373 7.52656 6.65228 7.08943 7.08941C6.65229 7.52654 6.35375 8.08285 6.23113 8.68877C6.10851 9.29468 6.16725 9.9233 6.40002 10.496C6.20547 10.5191 6.00969 10.5302 5.81378 10.5293ZM9.32354 11.7018C8.85311 11.7018 8.39325 11.5622 8.00213 11.3009C7.611 11.0395 7.30617 10.668 7.12621 10.2333C6.94624 9.7987 6.89922 9.32045 6.99109 8.85908C7.08296 8.39771 7.30959 7.97395 7.64232 7.6414C7.97505 7.30885 8.39893 7.08244 8.86035 6.99082C9.32177 6.8992 9.79999 6.94648 10.2345 7.12668C10.6691 7.30688 11.0404 7.61191 11.3016 8.00318C11.5628 8.39444 11.702 8.85438 11.7018 9.3248C11.7008 9.9549 11.45 10.5589 11.0045 11.0044C10.5589 11.45 9.95492 11.7007 9.32482 11.7018H9.32354Z"
          fill="currentColor"
        />
        <path
          d="M9.70879 7.67615H8.94079V10.0761H9.70879V7.67615Z"
          fill="currentColor"
        />
        <path
          d="M9.70879 10.3641H8.94079V11.1001H9.70879V10.3641Z"
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id="clip0_51_30">
          <rect width="12.8" height="16" fill="currentColor" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default ExpiredClock;