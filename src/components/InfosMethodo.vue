<template>

  <section>

    <b-collapse
      class="card"
      animation="slide"
      aria-id="contentIdForA11y3"
      :open="false"
      >
      <template #trigger="props">
        <div
          class="card-header"
          role="button"
          aria-controls="contentIdForA11y3">
          <p class="card-header-title">
            Mode d'emploi du simulateur et méthodes de calcul
          </p>
          <a class="card-header-icon">
            <b-icon
              :icon="props.open ? 'menu-down' : 'menu-up'">
            </b-icon>
          </a>
        </div>
      </template>

      <div class="card-content">
        <div class="content">
          <h5>
            Introduction
          </h5>
          <p>
            Ce simulateur de répartition des excédents de gestion d'une Scop est un outil de type <i>widget</i> qui vise à jouer avec les différentes variables permmettant de calculer les parts de chaque personne impliquée dans la coopérative.
          </p>
          <p>
            Nous avons tenté d'intégrer à ce simulateur toutes les obligations légales propres aux Scop, et d'en rendre l'usage le plus simple possible.
          </p>
          <p>
            <strong>Pour rappel les bénéfices de la Scop sont obligatoirement répartis en trois parts :</strong>
          </p>
          <ul>
            <li>
              la part <strong>travail</strong> : participation brute des salarié•e•s aux bénéfices de l´entreprise (minimun 16%);
            </li>
            <li>
              la part <strong>entreprise</strong> : ce sont les réserves impartageables de l'entreprise (minimum 25%);
            </li>
            <li>
              la part <strong>capital</strong>, ou ce qui est redistribué aux associé·e·s au titre d'intérêts aux parts (maximum 33%, et doit être inférieure aux parts réserves et travail).
            </li>
            <li>
              En complément <strong>un•e associé•e ne peut détenir plus de 50% des parts sociales</strong>;
            </li>
          </ul>
          <p>
            Les variables principales sont :
          </p>
          <ul>
            <li>
              <strong>le montant des excédents de gestion sur l'exercice</strong> ;
            </li>
            <li>
              <strong>le pourcentage des parts réserves, travail et capital</strong> ;
            </li>
            <li>
              <strong>le nombre de salarié•e•s et d'associé•e•s</strong> ;
            </li>
            <li>
              <strong>le temps de travail sur l'exercice de chaque salarié•e</strong> ;
            </li>
            <li>
              <strong>le nombre de parts de chaque associé•e-salarié•e</strong>.
            </li>
          </ul>
          <p>
            Ce <i>widget</i> est en <i>open source</i>. Il est librement réutilisable et intégrable dans n'importe quel site internet.
            <br>
            Pour plus d'infos vous pouvez vous reporter à
            <strong><a href="https://github.com/multi-coop/multi-site-simulator" target="_blank">
              la documentation
             </a></strong>.
          </p>

          <hr>

          <h5>
            Mode d'emploi
          </h5>
          <p>
            Pour utiliser le simulateur il vous suffit de <strong>jouer avec les différents curseurs</strong>, ou d'<strong>ajouter ou retirer des membres</strong>. Les résultats sont calculés en temps réel pour chacun des membres de la coopérative.
          </p>
          <p>
            <strong>Si les valeurs entrées ou calculées ne respectent pas une des contraintes légales</strong> (par exemple s'il est indiqué une part allouée aux réserves de moins de 16%) <strong>les valeurs sont alors indiquées en rouge</strong>.
          </p>
          <p>
            <strong>Pour comprendre la ou les raisons de ces erreurs vous pouvez vous reporter à l'encart "Encadrement légal du sociétariat dans une Scop"</strong>.
          </p>
          <hr>

          <h5>
            Méthodes de calculs
          </h5>
          <p>
            Même s'il cherche à couvrir le maximum de cas possibles ce simulateur ne peut pas couvrir l'intégralité de toutes les situations possibles. Les calculs présentés ici reposent sur les hypothèses suivantes :
          </p>
          <ul>
            <li>
              <strong>La part travail (prime de participation) de chaque salarié•e est uniquement indexée sur le temps de travail</strong> : par exemple si un•e salarié•e a travaillé 10 mois aux 4/5emes son temps de travail total cumulé sur l'exercice sera équivalent à 8 mois.
            </li>
            <li>
              <strong>Ni l'anciennté ni le montant du salaire ne sont pris en compte pour calculer les dividendes ou la prime de participation.</strong>
            </li>
          </ul>

          <hr>

          <h5>
            Bugs et suggestions
          </h5>
          <p>
            N'hésitez pas à nous écrire à
            <strong><a href="mailto:contact@multi.coop">contact@multi.coop</a></strong>
            si vous voyez quelque chose à améliorer,
            voire à créer une <i>issue</i> sur
            <strong><a href="https://github.com/multi-coop/multi-site-simulator" target="_blank">
              le repo du code source ici.
            </a></strong>
          </p>

        </div>
      </div>

      <!-- <footer class="card-footer">
        <a class="card-footer-item">Save</a>
        <a class="card-footer-item">Edit</a>
        <a class="card-footer-item">Delete</a>
      </footer> -->

    </b-collapse>

    </section>

</template>

<script>
export default {
  name: 'InfosMethodo'
}
</script>
