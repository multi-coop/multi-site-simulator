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
          <h4>
            Introduction
          </h4>
          <p>
            Ce simulateur de répartition des excédents de gestion d'une Scop est un outil qui vise à jouer avec les différentes variables permmettant de calculer les parts de chaque personne impliquée dans la coopérative.
            Nous avons tenté d'intégrer à ce simulateur toutes les obligations légales propres aux Scop, et d'en rendre l'usage le plus simple possible.
          </p>
          <p>
            <strong>Pour rappel les bénéfices de la Scop sont obligatoirement répartis en trois parts :</strong>
          </p>
          <ul>
            <li>
              la part <strong>travail</strong> : participation des salariés aux bénéfices de l´entreprise (minimun 16%);
            </li>
            <li>
              la part <strong>entreprise</strong> : ce sont les réserves impartageables de l'entreprise (minimum 25%);
            </li>
            <li>
              la part <strong>capital</strong>, ou ce qui est redistribué en dividendes aux associé·e·s (maximum 33%, et doit être inférieure aux parts réserves et travail).
            </li>
          </ul>
          <p>
            Les variables principales sont :
            <ul>
              <li>
                <strong>le montant des excédents de gestion sur l'exercice</strong> ;
              </li>
              <li>
                <strong>le pourcentage des parts réserves, travail et capital</strong> ;
              </li>
              <li>
                <strong>le nombre de salariés et d'associés</strong> ;
              </li>
              <li>
                <strong>le temps de travail sur l'exercice de chaque salarié</strong> ;
              </li>
              <li>
                <strong>nombre de parts de chaque associé-salarié</strong>.
              </li>
            </ul>
          </p>

          <hr>

          <h4>
            Mode d'emploi
          </h4>
          <p>
            Pour utiliser le simulateur il vous siffit de <strong>jouer avec les différents curseurs</strong>, ou d'<strong>ajouter ou retirer des membres</strong>. Les résultats sont calculés en temps réel pour chacun des membres de la coopérative.
          </p>
          <p>
            <strong>Si les valeurs entrées ou calculées ne respectent pas une des contraintes légales</strong> (par exemple s'il est indiqué une part allouée aux réserves de moins de 16%) <strong>les valeurs sont alors indiquées en rouge</strong>.
          </p>
          <p>
            <strong>Pour vérifier la ou les raisons de ces erreurs vous pouvez vous reporter à l'encart "Encadrement légal du sociétariat dans une Scop"</strong>.
          </p>
          <hr>

          <h4>
            Méthodes de calculs
          </h4>
          <p>
            Même s'il cherche à couvrir le maximum de cas possibles ce simulateur ne peut pas couvrir l'intégralité de tous les possibles. Les calculs présentés ici reposent sur les hypothèses suivantes :
          </p>
          <p>
            <ul>
              <li>
                <strong>La part travail (prime de participation) de chaque salarié est uniquement indexée sur le temps de travail</strong> : par exemple si un salarié a travaillé 10 mois aux 4/5emes son temps de travail total cumulé sur l'exercice sera équivalent à 8 mois.
              </li>
              <li>
                <strong>Ni l'anciennté ni le montant du salaire ne sont pris en compte pour calculer les dividendes ou la prime de participation.</strong>
              </li>
            </ul>
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
