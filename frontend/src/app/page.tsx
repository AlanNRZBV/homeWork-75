import VigenereForm from "@/components/VigenereForm/VigenereForm";
import {useQuery} from "@tanstack/react-query";

export default function Home() {
  //
  // const query = useQuery({
  //   queryKey:['message'],
  //   queryFn:
  // })

  return (
    <>
      <VigenereForm/>
    </>
  )
}
