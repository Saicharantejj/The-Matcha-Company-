import PageShell from '../components/PageShell'
import BuildYourBox from '../components/BuildYourBox'
import BenefitsGrid from '../components/BenefitsGrid'

export default function BuildYourBoxPage() {
  return (
    <PageShell>
      <div className="pt-20 sm:pt-24">
        <BuildYourBox />
        <BenefitsGrid />
      </div>
    </PageShell>
  )
}
